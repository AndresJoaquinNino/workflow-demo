import { useReducer } from 'react';
import { HStack, Box, Spinner } from "@chakra-ui/react";
import { WorkflowManagerSidebar, WorkflowDiagram, reducer, initialState } from '.';
import { COMPONENT_HEIGHT } from '../../../utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getWorkflow } from '../../../repository';
import { useNotificationContext } from '../../../context/Notification';

function WorkflowManager() {

  const { id } = useParams();
  const { addNotification } = useNotificationContext();

  const onSuccessFetch = (data) => {
    const localNodes = data.nodes.map(node => ({
      id: node.reference,
      data: {
        label: node.text,
        role: 'init',
        isDeletable: false
      },
      position: {
        x: node.positionX,
        y: node.positionY
      },
      type: node?.nodeType?.nodeShape?.name.toLowerCase(),
    }));
    const localEdges = data.edges.map(edge => ({
      id: edge.reference,
      source: edge.source,
      sourceHandle: edge.sourceHandle,
      target: edge.target,
      targetHandle: edge.targetHandle,
    }));
    initialState.nodes = localNodes.length > 0 ? localNodes : initialState.nodes;
    initialState.edges = localEdges.length > 0 ? localEdges : initialState.edges;
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
    queryFn: () => getWorkflow(id),
    onSuccess: onSuccessFetch,
    onError: onErrorFetch,
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
