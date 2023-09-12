import { useReducer } from "react";
import { WorkflowTable, DeleteWorkflowModal, CreateWorkflowModal } from ".";
import { reducer, initialState } from "./workflowReducer";

const Workflows = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const openDeleteModal = (workflow) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: { workflow } });
  };

  const closeDeleteModal = () => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  };

  const openCreateModal = () => {
    dispatch({ type: 'OPEN_CREATE_MODAL' });
  };

  const closeCreateModal = () => {
    dispatch({ type: 'CLOSE_CREATE_MODAL' });
  };

  return (
    <>
      <WorkflowTable
        openDeleteModal={openDeleteModal}
        openCreateModal={openCreateModal}
      />
      <CreateWorkflowModal
        isOpen={state.isCreateModalOpen}
        onClose={closeCreateModal}
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
