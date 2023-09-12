import { useReducer } from 'react';
import { HStack, Box, Spinner } from "@chakra-ui/react";
import { WorkflowManagerSidebar, WorkflowDiagram, reducer, initialState } from '.';
import { COMPONENT_HEIGHT } from '../../../utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDiagramInfo } from '../../../repository';
import { useNotificationContext } from '../../../context/Notification';
import { MarkerType } from 'reactflow';

function WorkflowManager() {

  const { id } = useParams();
  const { addNotification } = useNotificationContext();

  const onSuccessFetch = ([workflowData, nodeTypes]) => {

    nodeTypes.filter(nodeType => !['init', 'end'].includes(nodeType.name.toLowerCase()))
    const localNodes = workflowData.nodes.map(node => {
      const nodeTypeName = node.nodeType.name.toLowerCase()
      const isImportanteNode = ['init', 'end'].includes(nodeTypeName) ? true : false;

      return {
        id: node.reference,
        data: {
          label: node.text,
          role: isImportanteNode ? nodeTypeName : '',
          isDeletable: isImportanteNode ? false : true,
        },
        position: {
          x: node.positionX,
          y: node.positionY
        },
        type: node?.nodeType?.nodeShape?.name.toLowerCase(),
      }
    });

    const localEdges = workflowData.edges.map(edge => ({
      id: edge.reference,
      source: edge.source,
      sourceHandle: edge.sourceHandle,
      target: edge.target,
      targetHandle: edge.targetHandle,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }));

    const localNodeTypes = nodeTypes.map(nodeType => ({
      id: nodeType.id,
      name: nodeType.name,
      shape: nodeType.nodeShape.name.toLowerCase(),
    }));

    initialState.nodes = localNodes.length > 0 ? localNodes : initialState.nodes;
    initialState.edges = localEdges.length > 0 ? localEdges : initialState.edges;
    initialState.nodeTypes = localNodeTypes.length > 0 ? localNodeTypes : initialState.nodeTypes;
  }

  const onErrorFetch = (error) => {
    addNotification({
      message: error.message,
      type: 'error',
      autoDelete: false,
    });
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['workflowManager', id],
    queryFn: () => getDiagramInfo(id),
    onSuccess: onSuccessFetch,
    onError: onErrorFetch,
    keepPreviousData: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isFullyLoaded = !isLoading && !isFetching && !isError;

  return (
    <HStack
      justifyContent='center'
      style={{
        height: COMPONENT_HEIGHT.sidebarWorkflow
      }}
    >
      {
        (isLoading || isFetching)
        &&
        <Spinner size='xl' />
      }
      {
        isFullyLoaded
        &&
        <>
          <Box h='100%' w='100%'>
            <WorkflowDiagram
              state={state}
              isFullyLoaded={isFullyLoaded}
              dispatch={dispatch}
            />
          </Box>
          <WorkflowManagerSidebar
            state={state}
            dispatch={dispatch}
          />
        </>
      }

    </HStack>
  );
}

export default WorkflowManager;
