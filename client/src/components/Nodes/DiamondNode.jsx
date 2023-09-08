import { Handle } from "reactflow";
import PropTypes from 'prop-types';
import { Box, Text } from "@chakra-ui/react";

const Diamond = ({ data }) => {

  const DOTS_SPACING = '-25%';
  const DIAMOND_SIZE = 125;

  return (
    <Box
      as="div"
      p={4}
      minW={DIAMOND_SIZE}
      minH={DIAMOND_SIZE}
      position="relative"
      transform="rotate(45deg)"
      background="blue.500"
    >
      <Box
        as="div"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%) rotate(-45deg)"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Handle
          type="target"
          position="top"
          id={`${data.id}.top`}
          style={{ top: DOTS_SPACING }}
        />
        <Handle
          type="source"
          position="right"
          id={`${data.id}.right`}
          style={{ right: DOTS_SPACING }}
        />
          <Text
            id={data.id}
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            {data.label}
          </Text>
        <Handle
          type="source"
          position="bottom"
          id={`${data.id}.bottom`}
          style={{ bottom: DOTS_SPACING }}
        />
        <Handle
          type="source"
          position="left"
          id={`${data.id}.left`}
          style={{ left: DOTS_SPACING }}
        />
      </Box>
    </Box>
  );
};

Diamond.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Diamond;