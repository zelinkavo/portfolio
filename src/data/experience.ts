/**
 * Experience Data — Timeline Entries
 *
 * Quantifiable achievements for the interactive
 * Experience Timeline component.
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
  // TODO: Populate with real experience data from the user
  {
    id: 'current-role',
    role: {
      es: 'Senior Full Stack Developer & AI Solutions Engineer',
      en: 'Senior Full Stack Developer & AI Solutions Engineer',
    },
    company: 'Freelance / Consultoría',
    period: {
      es: 'Actualidad',
      en: 'Present',
    },
    description: {
      es: 'Orquestación de sistemas autónomos y ecosistemas digitales.',
      en: 'Orchestration of autonomous systems and digital ecosystems.',
    },
    achievements: {
      es: [
        'Diseño e implementación de arquitecturas multi-servidor',
        'Automatización de flujos empresariales con IA',
        'Gestión de infraestructura cloud-native',
      ],
      en: [
        'Multi-server architecture design and implementation',
        'Enterprise workflow automation with AI',
        'Cloud-native infrastructure management',
      ],
    },
    technologies: ['Python', 'PHP', 'TypeScript', 'Docker', 'Cloudflare'],
    current: true,
  },
];
