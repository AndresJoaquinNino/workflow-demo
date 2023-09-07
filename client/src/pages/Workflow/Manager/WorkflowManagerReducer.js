export const initialState = {
  nodes: [],
  edges: [],
  focusElement: {
    type: '',
    id: ''
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      return {
        ...state,
        nodes: [...state.nodes, action.payload],
      };
    case 'UPDATE_NODES':
      return {
        ...state,
        nodes: action.payload
      };
    case 'REMOVE_NODE':
      return {
        ...state,
        nodes: state.nodes.filter((node) => node.id !== action.payload),
        focusElement: {
          type: '',
          id: ''
        }
      };
    case 'ADD_EDGE':
      return {
        ...state,
        edges: [...state.edges, action.payload],
      };
    case 'UPDATE_EDGES':
      return {
        ...state,
        edges: action.payload
      };
    case 'REMOVE_EDGE':
      return {
        ...state,
        edges: state.edges.filter((edge) => edge.id !== action.payload)
      };
    case 'SET_FOCUS_ELEMENT':
      return {
        ...state,
        focusElement: action.payload
      };
    default:
      return state;
  }
};