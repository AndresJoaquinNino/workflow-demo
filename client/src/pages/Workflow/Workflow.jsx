import { useReducer } from "react";
import { WorkflowTable, DeleteWorkflowModal } from ".";
import { reducer, initialState } from "./workflowReducer";

const Workflows = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const openDeleteModal = (workflow) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: { workflow } });
  };

  const closeDeleteModal = () => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  };

  return (
    <>
      <WorkflowTable
        openDeleteModal={openDeleteModal}
      />
      <DeleteWorkflowModal
        workflow={state.workflow}
        isOpen={state.isDeleteModalOpen}
        onClose={closeDeleteModal}
      />
    </>
  );
};

export default Workflows;
