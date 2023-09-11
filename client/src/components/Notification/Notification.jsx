import PropTypes from 'prop-types';
import { Box, Text, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaXmark } from 'react-icons/fa6';

const Notification = ({ message, handleDelete }) => {

  const ICON_POSITION = 2;

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box
          bg="blue.500"
          color="white"
          borderRadius="md"
          boxShadow="lg"
          minW={300}
          maxW={300}
          position='relative'
        >
          <IconButton
            isRound={true}
            bgColor='transparent'
            position='absolute'
            top={ICON_POSITION}
            right={ICON_POSITION}
            icon={<FaXmark />}
            onClick={handleDelete}
            color='white'
            __css={{
              '&:hover': {
                bgColor: 'transparent',
                color: 'white',
              }
            }}
          />
          <Text
            as='p'
            p={5}
          >
            {message}
          </Text>
        </Box>
      </motion.div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Notification;