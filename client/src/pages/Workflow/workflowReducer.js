export const initialState = {
  isDeleteModalOpen: false,
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
    default:
      return state;
  }
};