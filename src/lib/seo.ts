/**
 * SEO Utilities
 *
 * Helpers for generating meta tags, JSON-LD structured
 * data, and Open Graph metadata.
 */

export interface SEOProps {
  title: string;
  description: string;
  lang?: 'es' | 'en';
  canonicalURL?: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

/**
 * Generate JSON-LD structured data for the portfolio
 */
export function generatePersonJsonLd(lang: 'es' | 'en' = 'es') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'zelinkavo',
    jobTitle:
      lang === 'es'
        ? 'Senior Full Stack Developer & AI Solutions Engineer'
        : 'Senior Full Stack Developer & AI Solutions Engineer',
    description:
      lang === 'es'
        ? 'Orquestador de sistemas autónomos y ecosistemas digitales'
        : 'Orchestrator of autonomous systems and digital ecosystems',
    url: 'https://portfolio.pages.dev',
    sameAs: [
      'https://github.com/zelinkavo',
      'https://linkedin.com/in/zelinkavo',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Full Stack Development',
      'Cloud Infrastructure',
      'Multi-Agent Orchestration',
      'DevOps',
    ],
  };
}

/**
 * Generate JSON-LD structured data for the website
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portfolio Senior 2026',
    url: 'https://portfolio.pages.dev',
    inLanguage: ['es', 'en'],
  };
}
