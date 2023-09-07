import { useState, } from 'react';
import { HStack, Box} from "@chakra-ui/react";
import { WorkflowManagerSidebar, WorkflowDiagram } from '.';

const initialEdges = [
  // { id: '1-2', source: '1', target: '2', type: 'step' }
];

const initialNodes = [
  // {
  //   id: '1',
  //   data: { label: 'Hello' },
  //   position: { x: 0, y: 0 },
  //   type: 'input',
  // },
  // {
  //   id: '2',
  //   data: { label: 'World' },
  //   position: { x: 100, y: 100 },
  // },
];

function WorkflowManager() {
  const focusElementInitialState = { type: '', id: '' };
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [focusElement, setFocusElement] = useState(focusElementInitialState);

  const addNewNode = (event) => {
    event.preventDefault();
    const entityName = event.target.entityName.value
    const entityType = event.target.entityType.value
    const color = entityType === 'process' ? '#689fc9' : '#319795'
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: entityName },
      position: { x: 100, y: 100 },
      style: { backgroundColor: color, color: '#fff' },
    };
    // borderRadius: '50%', width: 'auto'
    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId) => {
    const newNodes = nodes.filter((node) => node.id !== nodeId)
    setNodes(newNodes)
    setFocusElement(focusElementInitialState)
  }

  const deleteEdge = (nodeId) => {
    const newEdges = edges.filter((node) => node.id !== nodeId)
    setEdges(newEdges)
    setFocusElement(focusElementInitialState)
  }

  return (
    <HStack style={{ height: '100vh' }}>
      <Box h='100%' w='100%'>
        <WorkflowDiagram
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          setFocusElement={setFocusElement}
        />
      </Box>
      <WorkflowManagerSidebar
        focusElement={focusElement}
        addNewNode={addNewNode}
        deleteNode={deleteNode}
        deleteEdge={deleteEdge}
      />

    </HStack>
  );
}

export default WorkflowManager;
