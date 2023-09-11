import PropTypes from 'prop-types';
import { AnimatePresence } from "framer-motion";
import { VStack } from "@chakra-ui/react";

const NotificationContainer = ({ children }) => {
  return (
    <VStack
      position="fixed"
      bottom="5%"
      right="5%"
      wrap={'wrap-reverse'}
    >
      <AnimatePresence>
        {
          children
        }
      </AnimatePresence>
    </VStack>
  );
}

NotificationContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotificationContainer;