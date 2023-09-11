import { Box, HStack, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { COMPONENT_WIDTH, COMPONENT_HEIGHT } from "../utils";

const Navbar = () => {
  return (
    <Box
      w='100%'
      maxW={COMPONENT_WIDTH.desktopLarge}
      marginX='auto'
      mt={2}
      mb={5}
      px={1}
    >
      <Box
        as='nav'
        w='100%'
        h={COMPONENT_HEIGHT.navbar}
        borderWidth='1px'
        borderStyle='solid'
        borderColor='gray.200'
      >
        <HStack
          w='100%'
          h='100%'
          px={5}
          alignItems='center'
          justifyContent='space-between'
        >
          <Link to='/'>
            <Text as='b' fontSize='2xl' color='blue.800'>
              My Workflows
            </Text>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;