
const initNodes = [
  {
    id: '1',
    data: { label: 'Init', role: 'init', isDeletable: false },
    position: { x: 100, y: 100 },
    type: 'circle',
  },
  {
    id: '2',
    data: { label: 'End', role: 'end', isDeletable: false },
    position: { x: 100, y: 300 },
    type: 'circle',
  },
];

const initEdges = [
  {
    id: "reactflow__edge-11.bottom-22.top",
    markerEnd: { type: 'arrowclosed' },
    source: "1",
    sourceHandle: "1.bottom",
    target: "2",
    targetHandle: "2.top",
    type: "smoothstep",
  }
];

export const initFocusElement = {
  type: '',
  id: ''
};

export const initialState = {
  nodes: initNodes,
  edges: initEdges,
  focusElement: initFocusElement
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
        edges: state.edges.filter((edge) => edge.id !== action.payload),
        focusElement: {
          type: '',
          id: ''
        }
      };
    case 'SET_FOCUS_ELEMENT':
      return {
        ...state,
        focusElement: action.payload
      };
    case 'UPDATE_NODES_AND_EDGES':
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges
      };
    default:
      return state;
  }
};