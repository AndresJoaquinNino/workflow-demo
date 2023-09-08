import { useReducer } from 'react';
import { HStack, Box } from "@chakra-ui/react";
import { WorkflowManagerSidebar, WorkflowDiagram, reducer, initialState } from '.';
import { COMPONENT_HEIGHT } from '../../../utils';

function WorkflowManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HStack style={{ height: COMPONENT_HEIGHT.sidebarWorkflow }}>
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
