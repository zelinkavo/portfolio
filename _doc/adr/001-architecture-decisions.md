# ADR-001: Astro 6 Island Architecture

## Status: Accepted
## Date: 2026-04-09

## Context
We need a framework that delivers extreme performance (Lighthouse 100/100, LCP < 0.5s) while supporting rich interactivity for React Flow diagrams and Three.js 3D scenes.

## Decision
Use Astro 6 with Island Architecture. Interactive components are hydrated selectively using `client:visible` and `client:idle` directives.

## Consequences
- **Positive**: Zero JS by default, selective hydration, excellent Core Web Vitals
- **Positive**: Native React integration for interactive islands
- **Negative**: Cannot use full SPA patterns (acceptable tradeoff)
- **Negative**: Must carefully manage island boundaries

---

# ADR-002: Tailwind CSS 4 over v3

## Status: Accepted
## Date: 2026-04-09

## Context
Tailwind CSS 4 introduces native CSS integration, faster builds, and reduced configuration overhead.

## Decision
Use Tailwind CSS 4 via `@tailwindcss/vite` plugin with `@theme` directive for design tokens.

## Consequences
- **Positive**: Modern CSS features, better performance, simpler config
- **Negative**: Newer version with potentially fewer community resources

---

# ADR-003: React Three Fiber over vanilla Three.js

## Status: Accepted
## Date: 2026-04-09

## Context
Three.js scenes (Skills Radar, Hero parallax) need to integrate cleanly with Astro's React islands.

## Decision
Use React Three Fiber (R3F) for declarative 3D rendering within React island components.

## Consequences
- **Positive**: Declarative API, React component model, easier state management
- **Positive**: Seamless integration with Astro React islands
- **Negative**: Additional abstraction layer over Three.js
