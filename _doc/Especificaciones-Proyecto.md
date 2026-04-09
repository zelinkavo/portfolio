PROJECT SPECIFICATION: SENIOR AI SOLUTIONS PORTFOLIO (2026)
1. VISION GENERAL Y PERFIL
    * Rol: Senior Full Stack Developer & AI Solutions Engineer
    * Propósito: Crear un portafolio que funcione como una prueba de concepto de ingeniería de alto nivel, demostrando capacidad de orquestación de sistemas, automatización y despliegue en el "edge"
    * Filosofía: "Calidad sobre cantidad". Foco en la transparencia de la colaboración Humano-IA y en métricas de negocio reales.
2. ARQUITECTURA TÉCNICA (STACK 2026)
    * Framework Principal: Astro 6 (Arquitectura de Islas para rendimiento extremo y zero-JS por defecto)
    * Rendimiento: Objetivo estricto de 100/100 en Lighthouse (LCP < 0.5s)
    * UI/UX: Bento Grid (Diseño modular asimétrico) con Tailwind CSS 4 y componentes Shadcn/ui
    * Interactividad:
        * React Flow (@xyflow/react): Para visualización de flujos lógicos y arquitecturas de agentes
        * Three.js: Para micro-experiencias 3D (Radar de habilidades y efectos físicos)
    * Despliegue: Cloudflare Pages con adaptador workerd (paridad total entre desarrollo y producción)
3. PROYECTOS CORE (NARRATIVA C-A-R)
    * PROYECTO 1: Enterprise Appointment Orchestration (Caso Svenson)
        * Desafío: Automatización del flujo lead-to-appointment para clínicas capilares.
        * Acción:
            * Captura: Script Python en servidor local que consume leads de APIs externas.
            * Orquestación: Middleware (API propia) en servidor Web que gestiona registros en MySQL y eventos del bot.
            * Integración: Conexión con Meta API (WhatsApp) para envío de plantillas y flujo de agendamiento basado en nodos lógicos (sin alucinaciones de LLM).
            * Fallback: Sistema de transferencia a agentes humanos vía portal web en caso de errores o necesidad del caso.
            * Analytics: Dashboard de KPIs con buscadores, filtros y exportación (Excel/PDF) para operaciones y cliente.
            * Visualización: Diagrama interactivo en React Flow que muestre el flujo de datos entre los 3 servidores y las APIs involucradas.
    * PROYECTO 2: Simple Crypto Alerts (App en producción)
        * Desafío: Monitorización de precios en tiempo real con bajo consumo.
        * Acción:
            * Stack: React Native / Expo con BackgroundFetch (Modo Headless) para ejecución con app cerrada.
            * Estado: Gestión de persistencia y Modo Pro con Zustand.
            * Monetización: Integración de In-App Purchases (IAP).
            * Data: Consumo eficiente de la API de CoinGecko.
            * Visualización: Mockup interactivo mostrando notificaciones de "Alta Prioridad" y métricas de rendimiento
    * PROYECTO 3: Permanent: Hope & Vacuum – Arquitectura del Vacío y Terror Sistémico
        * Descripción: "Donde la lógica se encuentra con la angustia. No es solo un juego de terror psicológico en primera persona; es un estudio sobre la gestión de estados emocionales a través de sistemas lógicos de alta precisión."
        * El Desafío (Challenge): Construir una atmósfera opresiva donde el entorno reaccione de forma impredecible al comportamiento del jugador, manteniendo un rendimiento impecable.
        * La Acción (Action): Orquestación integral mediante Blueprints en Unreal Engine 5, diseñando máquinas de estado complejas para la IA y los eventos ambientales. Optimización del pipeline de renderizado y gestión de memoria para asegurar una inmersión fluida a 60 FPS.
        * El Resultado (Result): Un ecosistema digital coherente que une una experiencia interactiva en UE5 con un portal web corporativo (WordPress), demostrando una versatilidad total en la entrega de contenidos multimedia.

    * PROYECTO 4: Infraestructura y Automatización (DevOps/AIOps)
        * Contenido: Gestión de ecosistema propio de servidores.
        * Tecnologías: Despliegue de contenedores vía Dokploy, orquestación de flujos con n8n y automatización de recordatorios con estrategia de SMS Fallback.
4. ESTRATEGIA DE CONTENIDO Y SEO (TOPIC DNA)
    * Para optimizar la visibilidad ante los algoritmos de LinkedIn 2026, las habilidades deben presentarse en clusters semánticos
    * Cluster 1 (AI & Agents): Agentic Workflows, RAG, Multi-Agent Orchestration, NLP, Prompt Engineering.
    * Cluster 2 (Development): Full Stack Architect, API Middleware, Real-time Data Pipelines, Python, PHP, JavaScript.
    * Cluster 3 (Infrastructure): Docker, Dokploy, n8n, Cloud-Native (Cloudflare Workers), MySQL/SQL Server.
5. SECCIONES DE LA WEB (MODULAR BENTO)
    * Hero Block: Avatar con parallax 3D. Propuesta de valor: "Orquestador de sistemas autónomos y ecosistemas digitales"
    * Case Study Explorer: Bloque principal con el sistema de Svenson y su diagrama React Flow
    * App Showcase: Bloque para la app de Cripto y UE5.
    * Skills Radar: Gráfico 3D con Three.js que reaccione al movimiento del ratón (Tech Gyroscope)
    * Experience Timeline: Nodos interactivos que se expanden para revelar logros cuantificables
    * Contact Constellation: Iconos de contacto con física de resortes y gravedad
6. REGLAS DE DESARROLLO PARA EL AGENTE
    * Modo: Planning Mode obligado para generar artefactos (planes de implementación, listas de tareas y walkthroughs) antes de codificar
    * Documentación: Uso de diagramas Mermaid para arquitectura y archivos ADR (Architecture Decision Records)
    * Validación: El proyecto se sincronizará con este repositorio: https://github.com/zelinkavo/potfolio. Yo actuaré como revisor. No podrás hacer pruebas en local porque tengo que llevarlo a mi nube en Cloudflare Pages.   
    
