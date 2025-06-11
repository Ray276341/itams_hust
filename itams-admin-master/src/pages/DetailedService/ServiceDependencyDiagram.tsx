import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
} from "react-flow-renderer";
import { useDagreLayout } from "../../helpers/useDagre";

interface Dependency {
  id: string;
  name: string;
  relationshipName: string;
}

interface Props {
  outgoing: Dependency[];
  current: { id: string; name: string };
  incoming: Dependency[];
}

export default function DependencyGraph({
  outgoing,
  current,
  incoming,
}: Props) {
  const styleBase = {
    borderRadius: 8,
    padding: 8,
    textAlign: "center" as const,
    width: 160,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const rawNodes: Node[] = useMemo(() => {
    const centerNode: Node = {
      id: `curr-${current.id}`,
      data: { label: current.name },
      position: { x: 0, y: 0 },
      style: {
        ...styleBase,
        background: "#007aff",
        color: "#fff",
        border: "none",
      },
    };

    const outNodes: Node[] = outgoing.map((o) => ({
      id: `out-${o.id}`,
      data: { label: o.name },
      position: { x: 0, y: 0 },
      style: {
        ...styleBase,
        background: "#FFEB3B",
        color: "#000",
        border: "1px solid #aaa",
      },
    }));

    const inNodes: Node[] = incoming.map((i) => ({
      id: `in-${i.id}`,
      data: { label: i.name },
      position: { x: 0, y: 0 },
      style: {
        ...styleBase,
        background: "#4CAF50",
        color: "#fff",
        border: "1px solid #aaa",
      },
    }));

    return [centerNode, ...outNodes, ...inNodes];
  }, [outgoing, incoming, current]);

  const rawEdges: Edge[] = useMemo(() => {
    const edgesOut = outgoing.map((o, idx) => ({
      id: `e-out-${idx}`,
      source: `curr-${current.id}`,
      target: `out-${o.id}`,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      label: o.relationshipName,
      labelStyle: { fill: "#333", fontSize: 12 },
    }));

    const edgesIn = incoming.map((i, idx) => ({
      id: `e-in-${idx}`,
      source: `in-${i.id}`,
      target: `curr-${current.id}`,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      label: i.relationshipName,
      labelStyle: { fill: "#333", fontSize: 12 },
    }));

    return [...edgesOut, ...edgesIn];
  }, [outgoing, incoming, current]);

  const { nodes, edges } = useDagreLayout(rawNodes, rawEdges);

  return (
    <div style={{ width: "100%", height: "95%", background: "#fafafa" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        fitView
        zoomOnScroll={false}
        panOnScroll
      >
        <Background gap={16} />
        <MiniMap
          nodeColor={(n) =>
            n.id === `curr-${current.id}`
              ? "#007aff"
              : n.id.startsWith("out-")
              ? "#FFEB3B"
              : "#4CAF50"
          }
        />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
