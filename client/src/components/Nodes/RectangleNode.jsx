import { Handle } from "reactflow";
import PropTypes from 'prop-types';
import { Box, Text, Tooltip } from "@chakra-ui/react";

const RectangleNode = ({ data }) => {
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
        id={`${data.id}.top`}
        style={{ borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="right"
        id={`${data.id}.right`}
        style={{ borderRadius: 0 }}
      />
      <Tooltip label={data.label}>
        <Text
          id={data.id}
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
        id={`${data.id}.bottom`}
        style={{ borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="left"
        id={`${data.id}.left`}
        style={{ borderRadius: 0 }}
      />
    </Box>
  );
};

RectangleNode.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RectangleNode;