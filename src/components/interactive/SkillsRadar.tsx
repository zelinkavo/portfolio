/**
 * SkillsRadar.tsx — Interactive skills cluster visualization
 *
 * Shows all skill names directly (no hover required).
 * Animated orbital rings + hover glow effects.
 * Practical AND visually distinctive.
 */
import { useState, useMemo } from 'react';

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
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Cluster cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {clusters.map((cluster) => {
          const isActive = activeCluster === cluster.id;
          return (
            <div
              key={cluster.id}
              onMouseEnter={() => setActiveCluster(cluster.id)}
              onMouseLeave={() => setActiveCluster(null)}
              style={{
                background: isActive
                  ? 'linear-gradient(145deg, rgba(23, 27, 36, 0.9), rgba(17, 20, 26, 0.95))'
                  : '#171b24',
                border: `1px solid ${isActive ? cluster.color + '40' : '#1f2535'}`,
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative' as const,
                overflow: 'hidden',
                transform: isActive ? 'translateY(-2px)' : 'none',
                boxShadow: isActive ? `0 8px 32px ${cluster.color}15` : 'none',
              }}
            >
              {/* Ambient glow */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-30%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: cluster.color,
                opacity: isActive ? 0.06 : 0.02,
                filter: 'blur(60px)',
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }} />

              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem',
                position: 'relative',
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: cluster.color,
                  boxShadow: isActive ? `0 0 12px ${cluster.color}60` : 'none',
                  transition: 'box-shadow 0.3s ease',
                }} />
                <span style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: isActive ? cluster.color : '#e8e6e1',
                  transition: 'color 0.3s ease',
                }}>
                  {cluster.label}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#8b92a5',
                  letterSpacing: '0.05em',
                }}>
                  {cluster.skills.length} skills
                </span>
              </div>

              {/* Skills */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                position: 'relative',
              }}>
                {cluster.skills.map((skill, si) => (
                  <div
                    key={si}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.35rem 0.75rem',
                      background: 'rgba(10, 12, 16, 0.6)',
                      border: `1px solid ${isActive ? cluster.color + '25' : '#1f2535'}`,
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      fontSize: '0.78rem',
                      color: isActive ? '#e8e6e1' : '#9da3ae',
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {/* Level indicator */}
                    <div style={{
                      width: '3px',
                      height: '14px',
                      borderRadius: '2px',
                      background: `linear-gradient(to top, ${cluster.color} ${skill.level}%, #1f2535 ${skill.level}%)`,
                      opacity: isActive ? 0.8 : 0.4,
                      transition: 'opacity 0.3s ease',
                      flexShrink: 0,
                    }} />
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
