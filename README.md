# 🚀 Portfolio Senior 2026

> **Senior Full Stack Developer & AI Solutions Engineer**
> Orquestador de sistemas autónomos y ecosistemas digitales

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 6](https://astro.build) — Island Architecture |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Interactivity | [React Flow](https://reactflow.dev) · [Three.js (R3F)](https://r3f.docs.pmnd.rs) |
| CMS/Data | Static TypeScript data modules |
| Deploy | [Cloudflare Pages](https://pages.cloudflare.com) + workerd |
| i18n | Español (default) + English |

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
├── public/              # Static assets (images, models, robots.txt)
├── src/
│   ├── components/      # UI components
│   │   ├── *.astro      # Static Astro components
│   │   ├── *.tsx        # React islands (client:visible)
│   │   └── ui/          # Shadcn/ui primitives
│   ├── data/            # TypeScript data modules (projects, skills, experience)
│   ├── layouts/         # Page layouts (BaseLayout, BentoLayout)
│   ├── lib/             # Utility functions (animations, SEO, Three.js helpers)
│   ├── pages/           # File-based routing
│   └── styles/          # Global CSS + design tokens
├── _doc/                # Project documentation & specs
├── astro.config.mjs     # Astro configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── wrangler.toml        # Cloudflare Pages configuration
```

## Architecture

This portfolio uses Astro's **Island Architecture** for extreme performance:

- **Static by default**: All pages are server-rendered at build time with zero JavaScript
- **Selective hydration**: Interactive components (React Flow diagrams, Three.js scenes) hydrate on-demand via `client:visible`
- **Performance budget**: Target Lighthouse 100/100 with LCP < 0.5s

## License

MIT
