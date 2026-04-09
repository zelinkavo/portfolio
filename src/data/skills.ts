/**
 * Skills Data — Semantic Clusters
 *
 * Organized by Topic DNA clusters for LinkedIn SEO
 * optimization as defined in the project spec.
 */

export interface Skill {
  name: string;
  level: number; // 0-100
  cluster: 'ai' | 'development' | 'infrastructure';
}

export interface SkillCluster {
  id: string;
  title: {
    es: string;
    en: string;
  };
  color: string;
  skills: Skill[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: 'ai',
    title: {
      es: 'IA & Agentes',
      en: 'AI & Agents',
    },
    color: '#6c63ff',
    skills: [
      { name: 'Agentic Workflows', level: 85, cluster: 'ai' },
      { name: 'RAG', level: 80, cluster: 'ai' },
      { name: 'Multi-Agent Orchestration', level: 82, cluster: 'ai' },
      { name: 'NLP', level: 75, cluster: 'ai' },
      { name: 'Prompt Engineering', level: 90, cluster: 'ai' },
    ],
  },
  {
    id: 'development',
    title: {
      es: 'Desarrollo',
      en: 'Development',
    },
    color: '#a78bfa',
    skills: [
      { name: 'Full Stack Architecture', level: 92, cluster: 'development' },
      { name: 'API Middleware', level: 88, cluster: 'development' },
      { name: 'Real-time Data Pipelines', level: 80, cluster: 'development' },
      { name: 'Python', level: 85, cluster: 'development' },
      { name: 'PHP', level: 90, cluster: 'development' },
      { name: 'JavaScript/TypeScript', level: 92, cluster: 'development' },
    ],
  },
  {
    id: 'infrastructure',
    title: {
      es: 'Infraestructura',
      en: 'Infrastructure',
    },
    color: '#38bdf8',
    skills: [
      { name: 'Docker', level: 85, cluster: 'infrastructure' },
      { name: 'Dokploy', level: 80, cluster: 'infrastructure' },
      { name: 'n8n', level: 82, cluster: 'infrastructure' },
      { name: 'Cloudflare Workers', level: 78, cluster: 'infrastructure' },
      { name: 'MySQL / SQL Server', level: 88, cluster: 'infrastructure' },
    ],
  },
];
