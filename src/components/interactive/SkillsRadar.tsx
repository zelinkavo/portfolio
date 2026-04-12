/**
 * SkillsRadar.tsx — Interactive skills cluster visualization
 *
 * Transformed into "Core Tech Nodes" to avoid generic AI Bento layouts.
 * Features a mobile-first horizontal snap-carousel (to avoid vertical monotony)
 * and an engineered "blueprint/node" aesthetic per cluster, aligned with
 * the project's architectural Card styles.
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
          /* Important for desktop: stretch prevents uneven heights */
          align-items: stretch;
        }

        .skill-node {
          flex: 1;
          min-width: 0; /* flexbox fix for inner overflow */
          display: flex;
        }

        @media (max-width: 768px) {
           .skills-interactive-container::after {
              content: '';
              position: absolute;
              top: 0; right: 0; bottom: 0;
              width: 40px;
              background: linear-gradient(to right, transparent, var(--color-bg-base, #0a0c10));
              pointer-events: none;
              z-index: 2;
           }
          .skills-grid {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-left: 1rem; 
            padding-left: 1rem;
            padding-right: 2.5rem; 
            margin-left: -1rem;
            margin-right: -1rem;
            scrollbar-width: none; 
            padding-bottom: 1.5rem; 
          }
          .skills-grid::-webkit-scrollbar {
            display: none; 
          }
          .skill-node {
            flex: 0 0 85%; /* Mobile cards take 85% width, hinting at next card */
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
          font-family: "'JetBrains Mono', monospace";
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
          font-family: "'Outfit', system-ui, sans-serif";
          font-size: 1.1rem;
          font-weight: 600;
          color: #e8e6e1;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .node-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          z-index: 2;
        }

        /* Skill Item */
        .skill-row {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .skill-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .skill-name {
          font-family: "'Inter', system-ui, sans-serif";
          font-size: 0.875rem;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .node-card:hover .skill-name {
          color: #e8e6e1;
        }

        .skill-metric {
          font-family: "'JetBrains Mono', monospace";
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.3s ease;
        }
        .node-card:hover .skill-metric {
          color: var(--node-color);
          opacity: 0.9;
        }

        /* Futuristic Segmented Bar */
        .skill-track {
          display: flex;
          gap: 3px;
          width: 100%;
          height: 3px;
        }
        
        .skill-segment {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
        }
        
        .skill-segment.filled {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .node-card:hover .skill-segment.filled {
          background: var(--node-color);
          box-shadow: 0 0 6px var(--node-color-alpha);
        }

      `}</style>

      <div className="skills-grid">
        {clusters.map((cluster, idx) => {
          const isActive = activeNode === cluster.id;
          // Inject custom properties for colors
          const cardStyle = {
            '--node-color': cluster.color,
            '--node-color-alpha': `${cluster.color}60`, // Opacity for shadows
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
                  {cluster.skills.map((skill, si) => {
                    // Calculate segments to fill (out of 12 for finer detail)
                    const totalSegments = 12;
                    const filledSegments = Math.round((skill.level / 100) * totalSegments);
                    
                    return (
                      <div className="skill-row" key={si}>
                        <div className="skill-meta">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-metric">{skill.level}%</span>
                        </div>
                        <div className="skill-track">
                          {Array.from({ length: totalSegments }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`skill-segment ${i < filledSegments ? 'filled' : ''}`}
                              // Stagger the animation of segments slightly on hover
                              style={isActive && i < filledSegments ? { transitionDelay: `${i * 20}ms` } : {}}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
