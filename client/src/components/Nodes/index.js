export { default as RectangleNode } from './RectangleNode.jsx';
import RectangleNode from './RectangleNode.jsx';
import DiamondNode from './DiamondNode.jsx';
import CircleNode from './CircleNode.jsx';

export const nodeTypes = {
  rectangle: RectangleNode,
  diamond: DiamondNode,
  circle: CircleNode,
};
