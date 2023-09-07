import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';

const WorkflowDiagram = ({ state, dispatch }) => {

  const { nodes, edges } = state

  const handleFocus = (element, elementType) => {
    dispatch({ type: 'SET_FOCUS_ELEMENT', payload: { type: elementType, id: element.id } })
  }

  const onNodesChange = useCallback(
    (changes) => {
      dispatch({ type: 'UPDATE_NODES', payload: applyNodeChanges(changes, nodes) })
    }, [nodes, dispatch]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      dispatch({ type: 'UPDATE_EDGES', payload: applyEdgeChanges(changes, edges) })
    }, [edges, dispatch]
  );

  const onConnect = useCallback(
    (params) => {
      dispatch({ type: 'UPDATE_EDGES', payload: addEdge(params, edges) })
    }, [edges, dispatch]
  );

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
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


export default WorkflowDiagram;