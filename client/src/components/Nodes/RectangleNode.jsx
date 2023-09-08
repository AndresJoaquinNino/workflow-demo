import { Handle } from "reactflow";
import PropTypes from 'prop-types';
import { Box, Text, Tooltip } from "@chakra-ui/react";

const RectangleNode = ({ id, data }) => {
  return (
    <Box
      as="div"
      p={4}
      w={200}
      h={100}
      borderRadius={5}
      background="blue.300"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Handle
        type="target"
        position="top"
        id={`${id}.top`}
        style={{ borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="right"
        id={`${id}.right`}
        style={{ borderRadius: 0 }}
      />
      <Tooltip label={data.label}>
        <Text
          id={id}
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
        >
          {data.label}
        </Text>
      </Tooltip>
      <Handle
        type="source"
        position="bottom"
        id={`${id}.bottom`}
        style={{ borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="left"
        id={`${id}.left`}
        style={{ borderRadius: 0 }}
      />
    </Box>
  );
};

RectangleNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default RectangleNode;