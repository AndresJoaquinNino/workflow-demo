export const initialState = {
  isDeleteModalOpen: false,
  isCreateModalOpen: false,
  workflow: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalOpen: true,
        workflow: action.payload.workflow,
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalOpen: false
      };
    case 'OPEN_CREATE_MODAL':
      return {
        ...state,
        isCreateModalOpen: true,
      };
    case 'CLOSE_CREATE_MODAL':
      return {
        ...state,
        isCreateModalOpen: false
      };
    default:
      return state;
  }
};