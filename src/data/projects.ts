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
      es: 'Terror Psicológico en UE5 — Sistema de Esperanza y Vacío',
      en: 'Psychological Horror in UE5 — Hope & Vacuum Systems',
    },
    challenge: {
      es: 'Orquestar una atmósfera opresiva sin HUD que combine puzles complejos, plataformas en primera persona y un sistema de gestión de recursos donde la "Esperanza" es vida y moneda simultáneamente.',
      en: 'Orchestrating an oppressive HUD-less atmosphere that blends complex puzzles, first-person platforming, and a resource management system where "Hope" is both life and currency.',
    },
    action: {
      es: 'Desarrollo integral en Unreal Engine 5 integrando el sistema "Light of Iliran" para el control de gravedad/fuego, IA reactiva ("Reks") mediante Behavior Trees y una narrativa fragmentada basada en notas mentales.',
      en: 'Full-scale development in Unreal Engine 5 integrating the "Light of Iliran" system for gravity/fire control, reactive AI ("Reks") via Behavior Trees, and fragmented narrative based on mental notes.',
    },
    result: {
      es: 'Vertical slice de alta fidelidad con voces reales, banda sonora original y dos finales divergentes, optimizada para hardware medio manteniendo la visión artística AA.',
      en: 'High-fidelity vertical slice featuring real voices, original soundtrack, and two divergent endings, optimized for mid-range hardware while maintaining AA artistic vision.',
    },
    technologies: ['Unreal Engine 5', 'C++', 'Blueprints', 'Substance Painter', 'Level Design', 'Sound Design'],
    category: 'gamedev',
    clusters: ['development'],
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
    clusters: ['infrastructure', 'development'],
    featured: true,
    order: 4,
  },
];
