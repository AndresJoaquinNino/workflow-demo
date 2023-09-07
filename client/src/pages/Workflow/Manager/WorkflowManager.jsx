import { useReducer } from 'react';
import { HStack, Box } from "@chakra-ui/react";
import { WorkflowManagerSidebar, WorkflowDiagram, reducer, initialState } from '.';

function WorkflowManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HStack style={{ height: '100vh' }}>
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
    </HStack>
  );
}

export default WorkflowManager;
