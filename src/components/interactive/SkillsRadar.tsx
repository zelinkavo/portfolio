/**
 * SkillsRadar.tsx — Interactive SVG radial skills visualization
 *
 * Replaces the static badge list with an orbital layout.
 * Each skill cluster orbits a central label. Skills are dots
 * that reveal their name on hover.
 *
 * Renders as an Astro React island with client:visible.
 */
import { useState, useMemo } from 'react';

/* ── Types ── */
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

/* ── Props ── */
interface SkillsRadarProps {
  clusters: Cluster[];
}

/* ── Layout constants ── */
const SIZE = 500;
const CENTER = SIZE / 2;
const CLUSTER_RADIUS = 140;
const SKILL_RADIUS_MIN = 30;
const SKILL_RADIUS_MAX = 70;

/* ── Design tokens ── */
const palette = {
  bg: '#0a0c10',
  bgCard: '#171b24',
  textPrimary: '#e8e6e1',
  textSecondary: '#9da3ae',
  textMuted: '#8b92a5',
  border: '#1f2535',
};

export default function SkillsRadar({ clusters }: SkillsRadarProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  /* Compute cluster positions evenly around the circle */
  const clusterPositions = useMemo(() => {
    return clusters.map((cluster, i) => {
      const angle = (i * 2 * Math.PI) / clusters.length - Math.PI / 2;
      return {
        ...cluster,
        cx: CENTER + Math.cos(angle) * CLUSTER_RADIUS,
        cy: CENTER + Math.sin(angle) * CLUSTER_RADIUS,
        angle,
      };
    });
  }, [clusters]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        aspectRatio: '1',
      }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ width: '100%', height: '100%' }}
        role="img"
        aria-label="Skills radar visualization showing AI & Agents, Development, and Infrastructure skill clusters"
      >
        {/* Center rings */}
        {[120, 80, 40].map((r) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke={palette.border}
            strokeWidth={1}
            opacity={0.4}
          />
        ))}

        {/* Connection lines from center to cluster hubs */}
        {clusterPositions.map((cp) => (
          <line
            key={`line-${cp.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={cp.cx}
            y2={cp.cy}
            stroke={palette.border}
            strokeWidth={1}
            opacity={0.3}
          />
        ))}

        {/* Skill dots for each cluster */}
        {clusterPositions.map((cp) =>
          cp.skills.map((skill, si) => {
            const skillAngle =
              cp.angle +
              ((si - (cp.skills.length - 1) / 2) * 0.35);
            const distance =
              SKILL_RADIUS_MIN +
              (skill.level / 100) * (SKILL_RADIUS_MAX - SKILL_RADIUS_MIN);
            const sx = cp.cx + Math.cos(skillAngle) * distance;
            const sy = cp.cy + Math.sin(skillAngle) * distance;
            const isActive = activeSkill === `${cp.id}-${si}`;
            const isClusterActive = activeCluster === cp.id;
            const dotRadius = isActive ? 7 : 5;

            return (
              <g key={`${cp.id}-${si}`}>
                {/* Glow ring on hover */}
                {isActive && (
                  <circle
                    cx={sx}
                    cy={sy}
                    r={14}
                    fill={cp.color}
                    opacity={0.12}
                  >
                    <animate
                      attributeName="r"
                      values="12;16;12"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Skill dot */}
                <circle
                  cx={sx}
                  cy={sy}
                  r={dotRadius}
                  fill={cp.color}
                  opacity={
                    isActive ? 1 :
                    isClusterActive ? 0.9 :
                    activeCluster && !isClusterActive ? 0.2 : 0.7
                  }
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-out',
                  }}
                  onMouseEnter={() => {
                    setActiveSkill(`${cp.id}-${si}`);
                    setActiveCluster(cp.id);
                  }}
                  onMouseLeave={() => {
                    setActiveSkill(null);
                    setActiveCluster(null);
                  }}
                />

                {/* Skill label on hover */}
                {isActive && (
                  <g>
                    <rect
                      x={sx - 60}
                      y={sy - 28}
                      width={120}
                      height={22}
                      rx={6}
                      fill={palette.bgCard}
                      stroke={cp.color}
                      strokeWidth={1}
                      opacity={0.95}
                    />
                    <text
                      x={sx}
                      y={sy - 14}
                      textAnchor="middle"
                      fill={palette.textPrimary}
                      fontSize={10}
                      fontFamily="'Inter', system-ui, sans-serif"
                      fontWeight={500}
                    >
                      {skill.name}
                    </text>
                  </g>
                )}
              </g>
            );
          }),
        )}

        {/* Cluster hub labels */}
        {clusterPositions.map((cp) => {
          const isActive = activeCluster === cp.id;
          return (
            <g
              key={`hub-${cp.id}`}
              onMouseEnter={() => setActiveCluster(cp.id)}
              onMouseLeave={() => {
                setActiveCluster(null);
                setActiveSkill(null);
              }}
              style={{ cursor: 'pointer' }}
            >
              {/* Hub dot */}
              <circle
                cx={cp.cx}
                cy={cp.cy}
                r={isActive ? 10 : 8}
                fill={palette.bgCard}
                stroke={cp.color}
                strokeWidth={2}
                style={{ transition: 'all 0.2s ease-out' }}
              />
              <circle
                cx={cp.cx}
                cy={cp.cy}
                r={3}
                fill={cp.color}
              />

              {/* Hub label */}
              <text
                x={cp.cx}
                y={cp.cy + 24}
                textAnchor="middle"
                fill={isActive ? cp.color : palette.textSecondary}
                fontSize={11}
                fontWeight={600}
                fontFamily="'Outfit', system-ui, sans-serif"
                style={{ transition: 'fill 0.2s ease-out' }}
              >
                {cp.label}
              </text>
            </g>
          );
        })}

        {/* Center label */}
        <text
          x={CENTER}
          y={CENTER - 6}
          textAnchor="middle"
          fill={palette.textMuted}
          fontSize={10}
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing={1}
        >
          SKILLS
        </text>
        <text
          x={CENTER}
          y={CENTER + 10}
          textAnchor="middle"
          fill={palette.textMuted}
          fontSize={9}
          fontFamily="'JetBrains Mono', monospace"
          opacity={0.6}
        >
          hover to explore
        </text>
      </svg>
    </div>
  );
}
