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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { addNotification } = useNotificationContext();

  const onSuccessFetch = (data) => {
    dispatch({
      type: 'UPDATE_NODES_AND_EDGES',
      payload: {
        nodes: data.nodes.length > 0 ? data.nodes : initialState.nodes,
        edges: data.edges.length > 0 ? data.edges : initialState.edges
      }
    });
  }

  const onErrorFetch = (error) => {
    addNotification({
      message: error.message,
      type: 'error',
      autoDelete: false,
    });
  }

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
