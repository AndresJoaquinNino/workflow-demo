import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';

const WorkflowDiagram = ({ nodes, setNodes, edges, setEdges, setFocusElement }) => {

  const handleFocus = (element, elementType) => {
    setFocusElement({
      type: elementType,
      id: element.id
    });
  }

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [setEdges]
  );

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlow
      fitView
      onlyRenderVisibleElements
      nodes={nodes}
      edges={edges}
      onNodeDragStart={(event, node) => handleFocus(node, 'node')}
      onEdgeClick={(event, node) => handleFocus(node, 'edge')}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

WorkflowDiagram.propTypes = {
  nodes: PropTypes.array.isRequired,
  setNodes: PropTypes.func.isRequired,
  edges: PropTypes.array.isRequired,
  setEdges: PropTypes.func.isRequired,
  setFocusElement: PropTypes.func.isRequired,
};


export default WorkflowDiagram;