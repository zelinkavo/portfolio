# Documentación del Sistema de Recordatorio de Citas Svenson

Este sistema automatiza el envío de recordatorios de citas a clientes de Svenson mediante **WhatsApp** (S1 Gateway), utilizando **SMS** (CallToYou / ICR) como método alternativo en caso de fallo o ausencia del canal WhatsApp.

---

## 1. Funcionamiento General y Flujo de Datos

El script se ejecuta periódicamente y sigue este ciclo de vida para cada cita obtenida de la API de SvensonNet:

1.  **Validación Horaria**: El script comprueba la hora del servidor. Si se encuentra en horario intempestivo (**entre las 21:00 y las 09:00**), se cierra inmediatamente sin realizar ninguna acción para evitar molestias a los clientes.
2.  **Sincronización**: Conecta a la API de **SvensonNet** para descargar las citas pendientes (`getAppointments`).
2.  **Verificación de Estado (Anti-Duplicidad)**:
    *   Consulta la tabla local `Svenson_ConfirmacionCitas_WaSms`.
    *   Si existe un registro para el `codCita` actual con los mismos datos clave (Centro, Tipo, Fecha, Hora) y `marcado = 1`, **ignora la cita**.
    *   *Nota*: Si la cita ha sido reprogramada (cambio de fecha/hora), el sistema detectará el cambio y permitirá una nueva notificación.
3.  **Filtrado de Seguridad y Negocio**:
    *   **Validación de Móvil Español**: Se selecciona el primer teléfono (de `telefono1`, `telefono2`, `telefono3`) que sea un **móvil español válido** (9 dígitos, empieza por 6 o 7). Los fijos (9xx, 8xx) y números con formato incorrecto se descartan automáticamente. Gestionado por `PhoneValidator`.
    *   **Lista Negra (Dinámica)**: Se consulta la tabla `tbDoNotCall` en `EVOLUTIONDB` para bloquear teléfonos. Conexión persistente para optimizar rendimiento.
    *   **Excepciones Específicas**: Reglas para omitir centros específicos (ej: Centro 2810 / Tipo 04, Centro 804).
    *   **Gestión de Errores Fatales**: Citas sin teléfono móvil válido o con tipos de cita no configurados se registran como fallo permanente (`ERROR_PERMANENTE`) y **NO bloquean** el marcado global.
    *   **Reglas Temporales (Fechas)**:
        *   Tipo 09 (Intervenciones): Se avisa con **5 días o menos** de antelación.
        *   Resto de Tipos: Se avisa con **1 día (24h) o menos** de antelación.
        *   **Citas Pasadas o Inmediatas**: Si la cita ya ha pasado o la hora de la cita es dentro de las próximas **2 horas**, se descarta sin contar como pendiente para evitar molestias.
        *   *Nota*: Solo las citas que aún están por delante del umbral (ej: faltan 6 días) cuentan como pendientes y bloquean el marcado global del lote.
4.  **Intento de Envío Principal (WhatsApp)**:
    *   Normalización de número (prefijo `34` automático si falta).
    *   Generación de parámetros para Plantilla 269 (`confirmacion_cita_todostipos`).
5.  **Fallback (SMS)**:
    *   Si WhatsApp falla o no es apto, intenta envío vía `SmsService` con normalización GSM (sin acentos, mayúsculas).
6.  **Registro Unificado (Logging)**:
    *   Se crea **un único registro** en la tabla SQL con el resultado de ambos canales.
    *   **Prioridad del Mensaje**: El campo `mensaje` guarda el resumen de la plantilla de WhatsApp si tuvo éxito; si falló y se envió SMS, guarda el texto íntegro del SMS; en caso de error en ambos, guarda el motivo del fallo.

---

## 2. Estructura de Base de Datos (`Svenson_ConfirmacionCitas_WaSms`)

Esta tabla centraliza el control de envíos y evita duplicidades.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `ID` | bigint | PK Autonumérico. |
| `requestId` | bigint | ID del lote de citas devuelto por SvensonNet. |
| `codCita` | bigint | ID único e invariable de la cita en SvensonNet. |
| `enviadoPor` | varchar(50) | Indica el canal (`WHATSAPP`, `SMS`) o el tipo de error (`ERROR` para técnicos, `ERROR_PERMANENTE` para descartes lógicos como Blacklist o Exenciones). |
| `marcado` | int | `1` si la notificación se dio por finalizada (éxito o descarte permanente, incluyendo Blacklist y Exenciones), `0` si debe reintentarse. |
| `fecha` / `hora` | date / time | Fecha/Hora del intento de envío. |
| `codCentro` | varchar(50) | Código del centro Svenson. |
| `codTipoCita` | varchar(5) | Código del tipo de cita (01, 09, etc.). |
| `tipoCita` | varchar(50) | Descripción del tipo de cita. |
| `citaFecha` / `citaHora` | date / time | Datos de la cita programada. |
| `nombre` | varchar(200) | Nombre del cliente. |
| `mensaje` | varchar(500) | Contenido real enviado o motivo del descarte (ej: "Descartado: Blacklist"). |
| `telefono` | nchar(10) | Teléfono de contacto utilizado (sin prefijo). |
| `apellido1` / `apellido2` | varchar(200) | Apellidos del cliente. |
| `centro` | varchar(150) | Nombre/Dirección del centro. |
| `centroNumero` | varchar(50) | Teléfono del centro (para el mensaje). |
| `wa_success` | varchar(100) | 'true'/'false' del estado de WhatsApp. |
| `wa_msg_id` | varchar(100) | ID de mensaje de S1 Gateway. |
| `wa_result_message` | varchar(100) | Texto de respuesta de la API WA. |
| `wa_result_code` | varchar(100) | Código de respuesta de la API WA. |
| `sms_success` | varchar(100) | 'true'/'false' del estado de SMS. |
| `sms_msg_id` | varchar(100) | ID de mensaje de CallToYou. |
| `sms_result_message` | varchar(100) | Error o resultado de SMS. |
| `sms_result_code` | varchar(100) | Código numérico de SMS (0 = OK). |

---

## 3. Configuración del Sistema (`config.php`)

El archivo de configuración define el comportamiento del sistema según el entorno.

### Constantes Generales
*   `ENV`: Define el entorno de ejecución (`test` o `prod`).
*   `BASE_URL`: URL base de la API de SvensonNet (test o prod según `ENV`).
*   `CLIENT_ID` / `CLIENT_SECRET`: Credenciales OAuth2 para SvensonNet.
*   `API_USERNAME` / `API_PASSWORD`: Credenciales de acceso a la API (el password cambia según `ENV`).

### Modos de Prueba (Debug)
*   `TEST_MODE_PHONE`: Si tiene un número, el script enviará **todas las citas de la ejecución a este número** (sobrescribiendo el real) y se detendrá tras procesar el primer registro. Útil para validación visual de plantillas.
*   `TEST_MODE_CODTIPOCITA`: Permite forzar un tipo de cita específico (ej: `09`) para probar plantillas concretas sin tener citas reales de ese tipo. Solo funciona si `TEST_MODE_PHONE` está activo.
*   `TEST_MODE_FORCE_WHATSAPP_FAILURE`: Si es `true`, simula un fallo en WhatsApp para obligar a ejecutar y probar el flujo de fallback a SMS.
*   `TEST_MODE_FORCE_SMS_FAILURE`: Si es `true`, simula un fallo en SMS para probar el comportamiento del sistema cuando fallan ambos canales.

### Pasarelas de Envío
*   `WHATSAPP_ENABLED`: `true` para activar envíos reales por WhatsApp.
*   `WHATSAPP_URL` / `WHATSAPP_CLIENT_KEY`: Datos de conexión con S1 Gateway.
*   `WHATSAPP_TEMPLATE_ID` / `WHATSAPP_TEMPLATE_NAME`: Identificador de la plantilla 269.
*   `WHATSAPP_PREFIX`: Prefijo de país para España (`34`).
*   `SMS_ENABLED`: `true` para activar envíos reales por SMS (ICR/CallToYou).
*   `SMS_API_URL` / `SMS_API_USER` / `SMS_API_PASS`: Credenciales de la API de SMS.
*   `SMS_SENDER_ID`: Remitente del SMS (máx 11 caracteres).

### Bases de Datos (ODBC)
*   `DB_SERVER` / `DB_DATABASE`: Servidor y base de datos principal (`Svenson`).
*   `DB_USER` / `DB_PASS`: Credenciales de SQL Server.
*   `DB_EVO_*`: Parámetros de conexión a la base de datos externa `EVOLUTIONDB` para la gestión de la Blacklist.

---

## 4. Estructura de Archivos

*   `svenson_recordatorio_citas.php`: **Orquestador**. Lógica de bucle, filtros de fecha y secuencia WA -> SMS.
*   `config.php`: Configuración centralizada.
*   `src/SvensonAPI.php`: Cliente para la API de SvensonNet.
*   `src/DatabaseService.php`: Gestión de SQL Server (ODBC). Incluye métodos de **escapado SQL**, **isBlacklisted** y log unificado.
*   `src/WhatsAppService.php`: Cliente S1 Gateway. Lógica de plantillas y reintentos automáticos.
*   `src/SmsService.php`: Cliente SMS. Normalización de texto avanzada.
*   `src/CentersRepository.php`: Repositorio estático de datos de centros (Direcciones, Teléfonos y Maps).
*   `src/PhoneValidator.php`: Validador de teléfonos móviles españoles. Filtra fijos y números erróneos, seleccionando el primer móvil válido (6xx/7xx, 9 dígitos). Compatible con PHP 5.x y superior.

---

## 5. Seguridad y Optimización

*   **Protección SQL**: Se utiliza `$db->escape()` en todas las variables que forman parte de las consultas SQL para prevenir inyecciones.
*   **Conexión Persistente**: Se mantiene una única conexión abierta con `EVOLUTIONDB` para la Blacklist, optimizando el rendimiento frente a la apertura de múltiples conexiones en bucle.
*   **Normalización de Contactos**: El sistema realiza una limpieza y validación del prefijo de país antes de enviar por WhatsApp para evitar errores de envío comunes.

---

## 6. Resiliencia y Reintentos

Para asegurar la continuidad del servicio frente a inestabilidades de red o picos de carga:

*   **Conexiones API**: Las llamadas críticas a la API de SvensonNet (`authenticate` y `getAppointments`) cuentan con una lógica de **3 reintentos automáticos** con esperas de 5 segundos en caso de fallo de red o respuesta no válida.
*   **WhatsApp**: El servicio S1 Gateway incluye su propia lógica de reintentos (max 3) en caso de fallos de conexión.
*   **ODBC**: Se gestionan reconexiones automáticas en caso de pérdida de conexión persistente con `EVOLUTIONDB` durante el proceso de validación de Blacklist.


## 7. Tabla de Auditoría de Ejecución

### Tabla: `Svenson_ConfirmacionCitas_WaSms_Logs`
Esta tabla registra un resumen técnico cada vez que se ejecuta el script principal.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `ID` | bigint | PK Autonumérico. |
| `requestId` | bigint | ID del lote de citas devuelto por SvensonNet (0 si falla antes). |
| `fechaEjecucion` | datetime | Momento de inicio del script. |
| `duracionSegs` | float | Tiempo total de proceso en segundos. |
| `totalCitas` | int | Citas encontradas en el lote. |
| `enviadasWhatsApp` | int | Total éxitos vía WhatsApp. |
| `enviadasSms` | int | Total éxitos vía SMS. |
| `pospuestas` | int | Citas a futuro que aún no cumplen el umbral de fecha. |
| `errorPermanente` | int | Descartes definitivos: Blacklist, Exenciones, Sin Teléfono o **Citas ya pasadas**. |
| `falloTecnico` | int | Citas que fallaron en ambos canales tras intentarlo. |
| `duplicadas` | int | Citas saltadas porque ya estaban marcadas como `1`. |
| `apiMarkSuccess` | bit | `1` si el lote se cerró con éxito en la API de SvensonNet. |
| `testMode` | bit | `1` si se ejecutó en modo prueba de teléfono único. |
| `observaciones` | varchar | Errores fatales o detalles del flujo. |

---

## 8. Apéndice: Estados y Casuísticas de Registro

A continuación se resumen los valores que toman los campos clave en la tabla `Svenson_ConfirmacionCitas_WaSms` según el escenario:

### Escenarios en `Svenson_ConfirmacionCitas_WaSms`

| Escenario | `enviadoPor` | `marcado` | `mensaje` | Observaciones |
| :--- | :--- | :--- | :--- | :--- |
| **Éxito WhatsApp** | `WHATSAPP` | `1` | Resumen Plantilla | Envío principal correcto. |
| **Éxito SMS (Fallback)** | `SMS` | `1` | Texto íntegro SMS | Falló WA, pero SMS funcionó. |
| **Fallo Total** | `ERROR` | `0` | "Fallo en ambos..." | Reintentable en la próxima ejecución. |
| **Blacklist** | `ERROR_PERMANENTE` | `1` | "Descartado: Blacklist" | Teléfono en `tbDoNotCall`. No se reintenta. |
| **Excepción Centro** | `ERROR_PERMANENTE` | `1` | "Descartado: Exencion..." | Reglas de negocio (ej: Centro 2810). No se reintenta. |
| **Sin Teléfono** | `ERROR_PERMANENTE` | `1` | "Error: Sin telefono" | Cita sin teléfonos de contacto. |
| **Sin Móvil Válido** | `ERROR_PERMANENTE` | `1` | "Error: Sin movil valido (tel: XXX)" | Cita con teléfonos pero ninguno es móvil español (fijo, formato erróneo, etc.). |
| **Tipo no válido** | `ERROR_PERMANENTE` | `1` | "Descartado: Tipo XX..." | Tipo de cita no configurado para envío. |

### Casuísticas en `Svenson_ConfirmacionCitas_WaSms_Logs`

*   **Ejecución Completa**: Se genera **siempre** un registro al finalizar el script (o tras procesar el primer registro en `TEST_MODE_PHONE`), indicando las métricas de éxito/fallo.
*   **Error Fatal**: Se genera un registro si el script se detiene inesperadamente (ej: fallo de conexión a API), capturando el error en el campo `observaciones`.
*   **Citas Pospuestas**: Las citas que se saltan por **Regla de Fechas** (ej: falta mucho tiempo o es demasiado tarde para avisar) **NO generan registro** en la tabla de citas, pero sí se cuentan en la columna `pospuestas` de la tabla de logs.
