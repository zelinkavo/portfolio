/**
 * SkillsRadar.tsx — Interactive skills cluster visualization
 *
 * Transformed into "Core Tech Nodes" to avoid generic AI Bento layouts.
 * Modified to use Hero Section tags instead of percentage bars.
 * Uses system variables for typography to match website coherence.
 */
import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  cluster: string;
}

interface Cluster {
  id: string;
  label: string;
  color: string;
  skills: Skill[];
}

interface SkillsRadarProps {
  clusters: Cluster[];
}

export default function SkillsRadar({ clusters }: SkillsRadarProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="skills-interactive-container">
      <style>{`
        .skills-interactive-container {
          width: 100%;
          position: relative;
        }
        
        .skills-grid {
          display: flex;
          gap: 1.5rem;
          align-items: stretch;
          /* Padding bottom to prevent shadow clipping from overflow-x */
          padding-bottom: 2.5rem;
          padding-top: 1rem;
        }

        .skill-node {
          flex: 1;
          min-width: 0; 
          display: flex;
        }

        @media (max-width: 768px) {
          .skills-grid {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-left: 0.5rem;
            padding-right: 2rem; 
            scrollbar-width: none; 
          }
          .skills-grid::-webkit-scrollbar {
            display: none; 
          }
          .skill-node {
            flex: 0 0 88%; /* Mobile cards take 88% width so next card peeks */
            scroll-snap-align: center;
          }
        }

        .node-card {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.4s ease;
          border-radius: 0; /* Sharp engineering look matching Projects */
        }

        .node-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
          pointer-events: none;
        }

        .node-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.01);
          transform: translateY(-2px);
        }

        .node-card:hover::before {
          opacity: 1;
        }

        /* Abstract ambient gradient inside */
        .node-ambient {
          position: absolute;
          top: -20%;
          right: -20%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: var(--node-color);
          opacity: 0;
          filter: blur(60px);
          transition: all 0.6s ease;
          pointer-events: none;
          z-index: 1;
        }
        .node-card:hover .node-ambient {
          opacity: 0.12;
          transform: scale(1.1);
        }

        /* Crosshairs matching Card.astro */
        .crosshair {
          position: absolute;
          width: 6px;
          height: 6px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 10;
          transition: border-color 0.3s ease;
        }

        .crosshair-tl { top: -3px; left: -3px; border-right: none; border-bottom: none; }
        .crosshair-tr { top: -3px; right: -3px; border-left: none; border-bottom: none; }
        .crosshair-bl { bottom: -3px; left: -3px; border-right: none; border-top: none; }
        .crosshair-br { bottom: -3px; right: -3px; border-left: none; border-top: none; }

        .node-card:hover .crosshair {
          border-color: var(--node-color);
          box-shadow: 0 0 6px var(--node-color-alpha);
        }

        .node-tag {
          position: absolute;
          top: -10px;
          right: 20px;
          background: var(--color-bg-primary, #0a0c10); 
          padding: 0 8px;
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index: 5;
          transition: color 0.3s ease;
        }

        .node-card:hover .node-tag {
          color: var(--node-color);
        }

        /* Tech Header styling */
        .node-header {
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .node-header::after {
          content: '';
          position: absolute;
          left: 1.5rem; bottom: -1px;
          height: 1px;
          width: 0%;
          background: var(--node-color);
          transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .node-card:hover .node-header::after {
          width: calc(100% - 3rem);
        }

        .node-label-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .node-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--node-color);
          box-shadow: 0 0 0 0 var(--node-color);
          opacity: 0.5;
          transition: all 0.4s ease;
        }
        .node-card:hover .node-dot {
          opacity: 1;
          box-shadow: 0 0 10px 1px var(--node-color-alpha);
          transform: scale(1.1);
        }

        .node-title {
          font-family: var(--font-heading, "Outfit", sans-serif);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-primary, #e8e6e1);
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .node-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        /* --- Hero Section Tech Tags Style --- */
        .skills-tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 12px;
          max-width: 100%;
        }

        .skill-tag {
          position: relative;
          isolation: isolate;
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          color: var(--color-text-secondary, #9da3ae);
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          cursor: default;
          overflow: hidden;
        }

        /* Architectural scanner light effect inside the tag */
        .skill-tag::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, var(--node-color-alpha), transparent);
          transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        /* Interaction Group (Hover one, dim others) */
        .skills-tags-grid:has(.skill-tag:hover) .skill-tag:not(:hover) {
          opacity: 0.35;
          filter: blur(1px);
          border-color: transparent;
        }

        .skill-tag:hover {
          color: var(--color-text-primary, #e8e6e1);
          border-color: var(--node-color-alpha);
          background: var(--node-color-bg);
          box-shadow: 0 4px 16px var(--node-color-shadow);
          transform: translateY(-2px);
        }

        .skill-tag:hover::before {
          left: 100%;
        }

      `}</style>

      <div className="skills-grid">
        {clusters.map((cluster, idx) => {
          // Identify if it's the hovered node, but the tags don't strictly need it to function.
          // Inject custom properties for colors to match cluster branding
          const cardStyle = {
            '--node-color': cluster.color,
            '--node-color-alpha': \`\${cluster.color}60\`,   // border lines / gradients
            '--node-color-bg': \`\${cluster.color}15\`,      // semi-transparent bg
            '--node-color-shadow': \`\${cluster.color}20\`,  // shadow glow
          } as React.CSSProperties;

          return (
            <div 
              className="skill-node" 
              key={cluster.id}
              onMouseEnter={() => setActiveNode(cluster.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div className="node-card" style={cardStyle}>
                
                {/* Architectural styling */}
                <div className="crosshair crosshair-tl" />
                <div className="crosshair crosshair-tr" />
                <div className="crosshair crosshair-bl" />
                <div className="crosshair crosshair-br" />
                
                <span className="node-tag">[{cluster.id.toUpperCase()}]</span>
                <div className="node-ambient" />
                
                <div className="node-header">
                  <div className="node-label-wrap">
                    <div className="node-dot" />
                    <span className="node-title">{cluster.label}</span>
                  </div>
                </div>

                <div className="node-content">
                  <div className="skills-tags-grid">
                    {cluster.skills.map((skill, si) => (
                      <span className="skill-tag" key={si}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
