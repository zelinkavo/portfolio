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
    featured: true,
    order: 1,
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
    featured: true,
    order: 2,
  },
  {
    id: 'permanent',
    slug: 'permanent',
    title: {
      es: 'Permanent: Hope & Vacuum',
      en: 'Permanent: Hope & Vacuum',
    },
    subtitle: {
      es: 'Arquitectura del Vacío y Terror Sistémico',
      en: 'Architecture of the Void and Systemic Horror',
    },
    challenge: {
      es: 'Construir una atmósfera opresiva donde el entorno reaccione de forma impredecible al comportamiento del jugador.',
      en: 'Build an oppressive atmosphere where the environment reacts unpredictably to player behavior.',
    },
    action: {
      es: 'Orquestación con Blueprints en UE5, máquinas de estado para IA, optimización de pipeline de renderizado a 60 FPS.',
      en: 'UE5 Blueprint orchestration, AI state machines, render pipeline optimization at 60 FPS.',
    },
    result: {
      es: 'Ecosistema digital coherente que une UE5 con portal web corporativo, demostrando versatilidad en entrega multimedia.',
      en: 'Coherent digital ecosystem linking UE5 with corporate web portal, demonstrating multimedia delivery versatility.',
    },
    technologies: ['Unreal Engine 5', 'Blueprints', 'WordPress', 'C++'],
    category: 'gamedev',
    featured: true,
    order: 3,
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
    featured: true,
    order: 4,
  },
];
