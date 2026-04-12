/**
 * Experience Data — Timeline Entries
 *
 * Real professional history for David Oliver.
 */

export interface ExperienceEntry {
  id: string;
  role: {
    es: string;
    en: string;
  };
  company: string;
  period: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  achievements: {
    es: string[];
    en: string[];
  };
  technologies: string[];
  current: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'universia',
    role: {
      es: 'Senior Full Stack Developer & AI Solutions Engineer',
      en: 'Senior Full Stack Developer & AI Solutions Engineer',
    },
    company: 'Universia Teleservicios S.L.',
    period: {
      es: 'Nov 2024 — Actualidad',
      en: 'Nov 2024 — Present',
    },
    description: {
      es: 'Orquestación de sistemas autónomos y ecosistemas digitales para operaciones empresariales.',
      en: 'Orchestration of autonomous systems and digital ecosystems for enterprise operations.',
    },
    achievements: {
      es: [
        'Diseño e implementación de arquitecturas multi-servidor',
        'Automatización de flujos empresariales con IA',
        'Integración de APIs y middleware de orquestación',
        'Gestión de infraestructura cloud-native',
      ],
      en: [
        'Multi-server architecture design and implementation',
        'Enterprise workflow automation with AI',
        'API integration and orchestration middleware',
        'Cloud-native infrastructure management',
      ],
    },
    technologies: ['Python', 'PHP', 'TypeScript', 'Docker', 'Cloudflare', 'MySQL'],
    current: true,
  },
  {
    id: 'freelance',
    role: {
      es: 'Senior Full Stack Developer',
      en: 'Senior Full Stack Developer',
    },
    company: 'Freelance',
    period: {
      es: '2022 — Nov 2024 · 3 años',
      en: '2022 — Nov 2024 · 3 years',
    },
    description: {
      es: 'Desarrollo de soluciones a medida para clientes diversos, desde apps móviles hasta plataformas web complejas.',
      en: 'Custom solution development for diverse clients, from mobile apps to complex web platforms.',
    },
    achievements: {
      es: [
        'Desarrollo y publicación de app móvil en producción (React Native)',
        'Implementación de sistemas de automatización y notificaciones',
        'Consultoría técnica y arquitectura de sistemas',
      ],
      en: [
        'Mobile app development and publication (React Native)',
        'Automation and notification system implementation',
        'Technical consulting and system architecture',
      ],
    },
    technologies: ['React Native', 'Expo', 'JavaScript', 'Node.js', 'PHP'],
    current: false,
  },
  {
    id: 'bouge-senior',
    role: {
      es: 'Responsable de desarrollo - Senior Full Stack Developer',
      en: 'Development Lead - Senior Full Stack Developer',
    },
    company: 'Bouge S.A. · Jornada completa',
    period: {
      es: 'abr. 2018 - sept. 2022 · 4 años 6 meses',
      en: 'Apr 2018 - Sep 2022 · 4 years 6 months',
    },
    description: {
      es: 'Liderazgo técnico y desarrollo full stack gestionando proyectos de principio a fin.',
      en: 'Technical leadership and full stack development, managing end-to-end projects.',
    },
    achievements: {
      es: [
        'Responsable técnico de proyectos web',
        'Evolución de stack tecnológico y migración de sistemas legacy',
        'Gestión de bases de datos y servidores de producción',
        'Mentoring a desarrolladores junior',
      ],
      en: [
        'Technical lead for web projects',
        'Technology stack evolution and legacy system migration',
        'Production database and server management',
        'Junior developer mentoring',
      ],
    },
    technologies: ['PHP', 'JavaScript', 'SQL Server', 'MySQL', 'WordPress', 'HTML/CSS'],
    current: false,
  },
  {
    id: 'freelance-senior-2015',
    role: {
      es: 'Freelance - Senior Full Stack Developer',
      en: 'Freelance - Senior Full Stack Developer',
    },
    company: 'Freelance',
    period: {
      es: 'feb. 2015 - ene. 2018 · 3 años',
      en: 'Feb 2015 - Jan 2018 · 3 years',
    },
    description: {
      es: 'Desarrollo de soluciones completas de manera independiente.',
      en: 'Full-stack solution development independently.',
    },
    achievements: {
      es: [
        'Desarrollo e implementación de proyectos a medida',
        'Integración de sistemas y bases de datos',
      ],
      en: [
        'Development and implementation of custom projects',
        'System and database integrations',
      ],
    },
    technologies: ['PHP', 'JavaScript', 'SQL Server', 'MySQL', 'HTML/CSS'],
    current: false,
  },
  {
    id: 'bouge-junior',
    role: {
      es: 'Desarrollador web Junior',
      en: 'Junior Web Developer',
    },
    company: 'Bouge S.A. · Jornada completa',
    period: {
      es: 'jul. 2012 - ene. 2015 · 2 año 7 meses',
      en: 'Jul 2012 - Jan 2015 · 2 years 7 months',
    },
    description: {
      es: 'Desarrollo inicial e implementación de soluciones web en Bouge S.A.',
      en: 'Initial development and implementation of web solutions at Bouge S.A.',
    },
    achievements: {
      es: [
        'Desarrollo de sitios corporativos y landing pages',
        'Mantenimiento de bases de datos SQL Server y MySQL',
      ],
      en: [
        'Development of corporate sites and landing pages',
        'Maintenance of SQL Server and MySQL databases',
      ],
    },
    technologies: ['PHP', 'JavaScript', 'SQL Server', 'MySQL', 'HTML/CSS'],
    current: false,
  },
];
