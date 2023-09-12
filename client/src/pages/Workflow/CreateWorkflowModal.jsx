import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { MdSave } from "react-icons/md";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storeWorkflow } from "../../repository";
import { useNotificationContext } from "../../context/Notification";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreateWorkflowModal = ({ isOpen, onClose }) => {

  const initialValues = {
    name: '',
    description: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });


  const { addNotification } = useNotificationContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const storeWorkflowMutation = useMutation(storeWorkflow, {
    retry: false,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries('workflowTable');
      addNotification({
        message: 'Workflow created successfully',
        type: 'success',
        autoDelete: true
      });
      navigate(`/manage/${id}`);
    },
    onError: (error) => {
      const errorList = error?.response?.data?.message;
      const errorMsg = Array.isArray(errorList) ? errorList.join(', ') : 'Something went wrong';
      console.log();
      addNotification({
        message: errorMsg,
        type: 'error',
        autoDelete: true
      });
    },
  });

  const handleSubmit = (workflowValues, actions) => {
    storeWorkflowMutation.mutate(workflowValues);
    actions.setSubmitting(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Workflow</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <FormControl
                  isInvalid={errors.name && touched.name}
                  mt={4}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    placeholder="..."
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.description && touched.description}
                  mt={4}
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    id="description"
                    placeholder="..."
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  type="submit"
                  mr={3}
                  isLoading={isSubmitting}
                  rightIcon={
                    <MdSave />
                  }
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal >
  );
}

CreateWorkflowModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateWorkflowModal;