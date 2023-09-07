import { Box, Button, VStack, Select, Text, Input, Heading } from "@chakra-ui/react";
import { FaCirclePlus } from "react-icons/fa6";
import PropTypes from 'prop-types';

const WorkflowManagerSidebar = ({ state, dispatch }) => {

  const { focusElement, nodes } = state

  const addNewNode = (event) => {
    event.preventDefault();
    const entityName = event.target.entityName.value
    const entityType = event.target.entityType.value
    const color = entityType === 'process' ? '#689fc9' : '#319795'
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: entityName },
      position: { x: 100, y: 100 },
      style: { backgroundColor: color, color: '#fff' },
    };
    dispatch({ type: 'ADD_NODE', payload: newNode })
  };

  const deleteNode = (nodeId) => {
    dispatch({ type: 'DELETE_NODE', payload: nodeId })
  }

  const deleteEdge = (nodeId) => {
    dispatch({ type: 'DELETE_EDGE', payload: nodeId })
  }

  return (
    <Box
      as="aside"
      right="0"
      top="0"
      h="100%"
      w="250px"
      border='1px'
      borderColor='gray.200'
      p="4"
    >
      <VStack align='start'>
        <Box w='100%' as='form' onSubmit={addNewNode}>
          <Heading size='lg' mb='4'>Add New Node</Heading>
          <Text mb='1'> Entity Name </Text>
          <Input mb='4' name='entityName' placeholder='...' />
          <Text mb='1'> Entity Type </Text>
          <Select
            mb='4'
            name='entityType'
            colorScheme='blue'
            variant='filled'
          >
            <option value='process'>Process</option>
            <option value='condition'>Condition</option>
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
  );
};

WorkflowManagerSidebar.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default WorkflowManagerSidebar;