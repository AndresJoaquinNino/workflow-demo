import {
  Box,
  Button,
  VStack,
  Select,
  Text,
  Input,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCirclePlus } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from '../../../utils';

const WorkflowManagerSidebar = ({ state, dispatch }) => {

  const { focusElement, nodes } = state;
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  const addNewNode = (event) => {
    event.preventDefault();
    const entityName = event.target.entityName.value
    const entityType = event.target.entityType.value
    const NODE_SHAPES = {
      process: 'rectangle',
      conditional: 'diamond',
    }
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: entityName },
      position: { x: 100, y: 100 },
      type: NODE_SHAPES[entityType],
    };
    dispatch({ type: 'ADD_NODE', payload: newNode })
    event.target.entityName.value = ''
  };

  const deleteNode = (nodeId) => {
    dispatch({ type: 'REMOVE_NODE', payload: nodeId })
  }

  const deleteEdge = (nodeId) => {
    dispatch({ type: 'REMOVE_EDGE', payload: nodeId })
  }

  return (
    <>
      <Button
        position="fixed"
        bottom="16px"
        right="16px"
        zIndex="999"
        colorScheme="blue"
        onClick={onToggle}
      >
        {isOpen ? 'Close Options' : 'Open Options'}
      </Button>

      <Box
        as="aside"
        right={isOpen ? "0" : -COMPONENT_WIDTH.mobile}
        transition="right 0.3s"
        bottom='0'
        height={COMPONENT_HEIGHT.sidebarWorkflow}
        w={COMPONENT_WIDTH.mobile}
        position='fixed'
        bgColor='white'
        border='1px'
        borderColor='gray.200'
        p="4"
      >
        <VStack align='start'>
          <Box w='100%' as='form' onSubmit={addNewNode}>
            <Heading size='lg' mb='4' textAlign='center' color='blue.900'>
              Add New Node
            </Heading>
            <Text mb='1'> Entity Name </Text>
            <Input mb='4' name='entityName' placeholder='...' />
            <Text mb='1'> Entity Type </Text>
            <Select
              mb='4'
              name='entityType'
              colorScheme='blue'
              variant='filled'
            >
              <option value='process'>Action</option>
              <option value='conditional'>Condition</option>
            </Select>
            <Button
              w='100%'
              type='submit'
              colorScheme='blue'
              rightIcon={<FaCirclePlus />}
            >
              Add
            </Button>
          </Box>
          {
            focusElement.type === 'node'
            &&
            <Button
              w='100%'
              colorScheme='red'
              onClick={() => deleteNode(focusElement.id)}
            >
              Delete Node
            </Button>
          }
          {
            focusElement.type === 'edge'
            &&
            <Button
              w='100%'
              colorScheme='red'
              onClick={() => deleteEdge(focusElement.id)}
            >
              Delete Edge
            </Button>
          }

        </VStack>
      </Box>
    </>
  );
};

WorkflowManagerSidebar.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default WorkflowManagerSidebar;