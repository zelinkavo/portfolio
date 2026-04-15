/**
 * Projects Data — C-A-R Narrative Structure
 * (Challenge - Action - Result)
 *
 * Each project follows the storytelling framework
 * defined in the spec for maximum impact.
 */

export interface Project {
  id: string;
  slug: string;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  challenge: {
    es: string;
    en: string;
  };
  action: {
    es: string;
    en: string;
  };
  result: {
    es: string;
    en: string;
  };
  technologies: string[];
  category: 'ai' | 'mobile' | 'gamedev' | 'devops';
  clusters?: ('ai' | 'development' | 'infrastructure')[];
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: 'svenson',
    slug: 'svenson',
    title: {
      es: 'Enterprise Appointment Orchestration',
      en: 'Enterprise Appointment Orchestration',
    },
    subtitle: {
      es: 'Caso Svenson — Automatización lead-to-appointment',
      en: 'Svenson Case — Lead-to-appointment automation',
    },
    challenge: {
      es: 'Automatización del flujo lead-to-appointment para clínicas capilares con múltiples puntos de integración.',
      en: 'Automating the lead-to-appointment flow for hair clinics with multiple integration points.',
    },
    action: {
      es: 'Captura con Python, orquestación via API middleware, integración con Meta WhatsApp API, sistema de fallback a agentes humanos y dashboard analytics.',
      en: 'Python capture, API middleware orchestration, Meta WhatsApp API integration, human agent fallback system and analytics dashboard.',
    },
    result: {
      es: 'Ecosistema de 3 servidores orquestados con flujo de datos visualizado en diagrama React Flow interactivo.',
      en: 'Orchestrated 3-server ecosystem with data flow visualized in interactive React Flow diagram.',
    },
    technologies: ['Python', 'PHP', 'MySQL', 'Meta API', 'WhatsApp', 'React Flow'],
    category: 'ai',
    clusters: ['ai', 'development', 'infrastructure'],
    featured: true,
    order: 1,
  },
  {
    id: 'svenson-reminders',
    slug: 'svenson-reminders',
    title: {
      es: 'Critical Messaging Engine',
      en: 'Critical Messaging Engine',
    },
    subtitle: {
      es: 'Notificaciones Omnicanal — Resiliencia y Fallback',
      en: 'Omnichannel Notifications — Resilience & Fallback',
    },
    challenge: {
      es: 'Garantizar la entrega de recordatorios médicos críticos superando fallos de red, respetando ventanas horarias legales y gestionando listas negras dinámicas sin impacto en el rendimiento.',
      en: 'Ensuring delivery of critical medical reminders bypassing network failures, respecting legal time windows, and managing dynamic blacklists without performance impact.',
    },
    action: {
      es: 'Desarrollo de un orquestador en PHP con lógica de fallback automático WhatsApp-to-SMS, validación regex de telefonía española y optimización de base de datos mediante conexiones persistentes.',
      en: 'PHP orchestrator development with automatic WhatsApp-to-SMS fallback logic, Spanish telephony regex validation, and database optimization via persistent connections.',
    },
    result: {
      es: 'Sistema 100% auditable con trazabilidad total de entregas, reducción de ausentismo y arquitectura capaz de procesar miles de registros con reintentos automáticos.',
      en: '100% auditable system with full delivery traceability, reduced absenteeism, and an architecture capable of processing thousands of records with automatic retries.',
    },
    technologies: ['PHP', 'MySQL', 'SQL Server', 'WhatsApp API', 'SMS API', 'Business Logic'],
    category: 'development',
    clusters: ['development', 'infrastructure'],
    featured: true,
    order: 2,
  },
  {
    id: 'crypto-alerts',
    slug: 'crypto-alerts',
    title: {
      es: 'Simple Crypto Alerts',
      en: 'Simple Crypto Alerts',
    },
    subtitle: {
      es: 'App en producción — Monitorización en tiempo real',
      en: 'Production app — Real-time monitoring',
    },
    challenge: {
      es: 'Monitorización de precios en tiempo real con bajo consumo y ejecución en background.',
      en: 'Real-time price monitoring with low consumption and background execution.',
    },
    action: {
      es: 'React Native / Expo con BackgroundFetch, gestión de estado con Zustand, integración IAP y API CoinGecko.',
      en: 'React Native / Expo with BackgroundFetch, Zustand state management, IAP integration and CoinGecko API.',
    },
    result: {
      es: 'App publicada con modo Pro, notificaciones de alta prioridad y métricas de rendimiento optimizadas.',
      en: 'Published app with Pro mode, high priority notifications and optimized performance metrics.',
    },
    technologies: ['React Native', 'Expo', 'Zustand', 'CoinGecko API', 'IAP'],
    category: 'mobile',
    clusters: ['development'],
    featured: true,
    order: 3,
  },
  {
    id: 'permanent',
    slug: 'permanent',
    title: {
      es: 'Permanent: Hope & Vacuum',
      en: 'Permanent: Hope & Vacuum',
    },
    subtitle: {
      es: 'Arquitectura de Videojuego 3D en UE5 — Sistemas y Level Design',
      en: '3D Game Architecture in UE5 — Systems & Level Design',
    },
    challenge: {
      es: 'Orquestar la arquitectura técnica completa de un título 3D en Unreal Engine 5, gestionando desde el diseño de niveles y narrativa técnica hasta la optimización de sistemas de IA y renderizado en tiempo real.',
      en: 'Orchestrating the full technical architecture of a 3D title in Unreal Engine 5, managing everything from level design and technical narrative to AI systems optimization and real-time rendering.',
    },
    action: {
      es: 'Implementación de sistemas híbridos C++/Blueprints, diseño de niveles mediante pipelines de Nanite/Lumen, orquestación de IA reactiva con Behavior Trees/EQS y desarrollo de herramientas de autoría personalizadas.',
      en: 'Implementing hybrid C++/Blueprints systems, level design via Nanite/Lumen pipelines, orchestrating reactive AI with Behavior Trees/EQS, and developing custom authorship tools.',
    },
    result: {
      es: 'Vertical slice optimizada a 60 FPS estables con una arquitectura de código desacoplada y escalable, demostrando competencia técnica integral en el desarrollo de software interactivo AAA.',
      en: 'Optimized vertical slice at stable 60 FPS with a decoupled and scalable code architecture, demonstrating full technical competence in AAA interactive software development.',
    },
    technologies: ['Unreal Engine 5', 'C++', 'Blueprints', 'Substance Painter', 'Level Design', 'Sound Design'],
    category: 'gamedev',
    clusters: ['development'],
    featured: true,
    order: 4,
  },
  {
    id: 'infra',
    slug: 'infra',
    title: {
      es: 'Infraestructura y Automatización',
      en: 'Infrastructure & Automation',
    },
    subtitle: {
      es: 'DevOps/AIOps — Ecosistema de servidores',
      en: 'DevOps/AIOps — Server ecosystem',
    },
    challenge: {
      es: 'Gestión y automatización de un ecosistema propio de servidores con múltiples servicios.',
      en: 'Management and automation of a self-hosted server ecosystem with multiple services.',
    },
    action: {
      es: 'Despliegue con Dokploy, orquestación de flujos con n8n, automatización de recordatorios con SMS Fallback.',
      en: 'Dokploy deployment, n8n flow orchestration, reminder automation with SMS Fallback.',
    },
    result: {
      es: 'Infraestructura resiliente con failover automático y monitorización centralizada.',
      en: 'Resilient infrastructure with automatic failover and centralized monitoring.',
    },
    technologies: ['Docker', 'Dokploy', 'n8n', 'Cloudflare Workers', 'MySQL'],
    category: 'devops',
    clusters: ['infrastructure', 'development'],
    featured: true,
    order: 5,
  },
];
