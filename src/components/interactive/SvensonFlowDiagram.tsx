/**
 * SvensonFlowDiagram.tsx — React Flow interactive architecture diagram
 *
 * Shows the 3-server Svenson appointment orchestration flow.
 * Renders as an Astro React island with client:visible.
 */
import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  Position,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/* ── Design tokens (mirror CSS vars) ── */
const palette = {
  bg: '#0a0c10',
  bgCard: '#171b24',
  bgSecondary: '#11141a',
  gold: '#d4a24e',
  steel: '#7c95c4',
  teal: '#5bb8a6',
  textPrimary: '#e8e6e1',
  textSecondary: '#9da3ae',
  textMuted: '#8b92a5',
  border: '#1f2535',
  borderAccent: 'rgba(212, 162, 78, 0.25)',
};

/* ── Custom node styles ── */
const baseNodeStyle: React.CSSProperties = {
  background: palette.bgCard,
  border: `1px solid ${palette.border}`,
  borderRadius: '12px',
  padding: '16px 20px',
  color: palette.textPrimary,
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '13px',
  minWidth: '160px',
  textAlign: 'center' as const,
};

const serverNodeStyle: React.CSSProperties = {
  ...baseNodeStyle,
  borderColor: palette.gold,
  boxShadow: `0 0 20px rgba(212, 162, 78, 0.08)`,
};

const apiNodeStyle: React.CSSProperties = {
  ...baseNodeStyle,
  borderColor: palette.steel,
  boxShadow: `0 0 20px rgba(124, 149, 196, 0.08)`,
};

const externalNodeStyle: React.CSSProperties = {
  ...baseNodeStyle,
  borderColor: palette.teal,
  boxShadow: `0 0 20px rgba(91, 184, 166, 0.08)`,
};

/* ── Nodes ── */
const initialNodes: Node[] = [
  {
    id: 'leads',
    position: { x: 0, y: 0 },
    data: { label: '📥 Pacientes\nLeads & Consultas' },
    style: externalNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'capture',
    position: { x: 280, y: 0 },
    data: { label: '🤖 Agentes Clínicos\nCrewAI' },
    style: serverNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'middleware',
    position: { x: 560, y: 0 },
    data: { label: '⚡ Orquestador\nLangchain' },
    style: serverNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'db',
    position: { x: 560, y: 150 },
    data: { label: '🗄️ MySQL\nAgendas & Leads' },
    style: apiNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Top,
  },
  {
    id: 'whatsapp',
    position: { x: 840, y: -60 },
    data: { label: '💬 WhatsApp\nMeta Business API' },
    style: externalNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'bot',
    position: { x: 840, y: 60 },
    data: { label: '🧠 Soporte Documental\nRAG / LlamaIndex' },
    style: serverNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'sms',
    position: { x: 840, y: 180 },
    data: { label: '📱 SMS Fallback\nTwilio' },
    style: externalNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'agent',
    position: { x: 1120, y: 60 },
    data: { label: '👤 Agente Humano\nPortal Web' },
    style: apiNodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

/* ── Edges ── */
const initialEdges: Edge[] = [
  {
    id: 'e-leads-capture',
    source: 'leads',
    target: 'capture',
    animated: true,
    style: { stroke: palette.teal, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: palette.teal },
    label: 'Interacción',
    labelStyle: { fill: palette.textMuted, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: palette.bg, fillOpacity: 0.8 },
  },
  {
    id: 'e-capture-middleware',
    source: 'capture',
    target: 'middleware',
    animated: true,
    style: { stroke: palette.gold, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: palette.gold },
    label: 'Delegación',
    labelStyle: { fill: palette.textMuted, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: palette.bg, fillOpacity: 0.8 },
  },
  {
    id: 'e-middleware-db',
    source: 'middleware',
    target: 'db',
    style: { stroke: palette.steel, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: palette.steel },
    label: 'Resolución SQL',
    labelStyle: { fill: palette.textMuted, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: palette.bg, fillOpacity: 0.8 },
  },
  {
    id: 'e-middleware-whatsapp',
    source: 'middleware',
    target: 'whatsapp',
    animated: true,
    style: { stroke: palette.gold, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: palette.gold },
    label: 'Generación',
    labelStyle: { fill: palette.textMuted, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: palette.bg, fillOpacity: 0.8 },
  },
  {
    id: 'e-middleware-bot',
    source: 'middleware',
    target: 'bot',
    animated: true,
    style: { stroke: palette.gold, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: palette.gold },
    label: 'Contexto RAG',
    labelStyle: { fill: palette.textMuted, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: palette.bg, fillOpacity: 0.8 },
  },
  {
    id: 'e-middleware-sms',
    source: 'middleware',
    target: 'sms',
    style: { stroke: palette.steel, strokeWidth: 1.5, strokeDasharray: '6 3' },
    markerEnd: { type: MarkerType.ArrowClosed, color: palette.steel },
    label: 'Fallback',
    labelStyle: { fill: palette.textMuted, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: palette.bg, fillOpacity: 0.8 },
  },
  {
    id: 'e-bot-agent',
    source: 'bot',
    target: 'agent',
    style: { stroke: palette.teal, strokeWidth: 1.5, strokeDasharray: '6 3' },
    markerEnd: { type: MarkerType.ArrowClosed, color: palette.teal },
    label: 'Escalado',
    labelStyle: { fill: palette.textMuted, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: palette.bg, fillOpacity: 0.8 },
  },
];

/* ── Component ── */
export default function SvensonFlowDiagram() {
  const defaultViewport = useMemo(() => ({ x: 30, y: 80, zoom: 0.85 }), []);

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  return (
    <div
      style={{
        width: '100%',
        height: '480px',
        borderRadius: '12px',
        border: `1px solid ${palette.border}`,
        background: palette.bg,
        overflow: 'hidden',
      }}
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        defaultViewport={defaultViewport}
        proOptions={proOptions}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        fitView={false}
        minZoom={0.5}
        maxZoom={1.5}
        colorMode="dark"
      >
        <Background color={palette.border} gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}
