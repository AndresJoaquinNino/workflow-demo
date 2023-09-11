import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorkflow } from "../../repository";
import { useNotificationContext } from "../../context/Notification";

const DeleteWorkflowModal = ({ workflow, isOpen, onClose }) => {

  const queryClient = useQueryClient();
  const { addNotification } = useNotificationContext();

  const deleteWorkflowMutation = useMutation(deleteWorkflow, {
    onSuccess: () => {
      queryClient.invalidateQueries('workflowTable');
      addNotification({
        message: `Workflow ${workflow.name} was successfully deleted`,
        type: 'success',
        autoDelete: true
      });
      onClose();
    },
    onError: (error) => {
      addNotification({
        message: error.message ?? 'Something went wrong',
        type: 'error',
        autoDelete: true
      });
    },
  });

  const handleDelete = () => {
    deleteWorkflowMutation.mutate(workflow.id);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Workflow</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete workflow <strong>{workflow?.name}</strong>?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

DeleteWorkflowModal.propTypes = {
  workflow: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteWorkflowModal;