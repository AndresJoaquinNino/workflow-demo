import { Handle } from "reactflow";
import PropTypes from 'prop-types';
import { Box, Text } from "@chakra-ui/react";

const circleColors = {
  init: 'green.300',
  end: 'red.300',
}

const CircleNode = ({ id, data }) => {

  return (
    <Box
      as="div"
      p={4}
      minW={100}
      minH={100}
      borderRadius='50%'
      background={circleColors[data.role]}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text id={id}>{data.label}</Text>
      {
        data.role === 'end'
        &&
        <Handle
          type="target"
          position="top"
          id={`${id}.top`}
        />

      }
      {
        data.role === 'init'
        &&
        <Handle
          type="source"
          position="bottom"
          id={`${id}.bottom`}
        />
      }
    </Box>
  );
};

CircleNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default CircleNode;