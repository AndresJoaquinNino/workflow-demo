import {
  Card,
  CardHeader,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaCirclePlus, FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";
import PropTypes from 'prop-types';

const WorkflowsTable = ({ workflows, openDeleteModal }) => {
  return (
    <Card px={6} py={2} rounded="md" shadow="md">
      <CardHeader>
        <HStack justifyContent='space-between' wrap='wrap'>
          <Heading>
            My Workflows
          </Heading>
          <Button rightIcon={<FaCirclePlus size='1.1rem' />} colorScheme="blue">
            New Workflow
          </Button>
        </HStack>
      </CardHeader>
      <TableContainer>
        <Table
          variant="simple"
          __css={{
            tableLayout: 'auto',
            width: 'full'
          }}
        >
          <Thead>
            <Tr>
              <Th w='20%'>ID</Th>
              <Th w='50%'>Name</Th>
              <Th w='20%'>Created at</Th>
              <Th w='10%'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workflows.map((workflow) => (
              <Tr key={workflow.id}>
                <Td>{workflow.id}</Td>
                <Td>{workflow.name}</Td>
                <Td>{workflow.created_at}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton icon={<MdOutlineInfo size='1.25rem' />} colorScheme="teal" size="sm" mr="2" />
                    <IconButton icon={<FaPenToSquare />} colorScheme="blue" size="sm" mr="2" />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      icon={<FaTrashCan />}
                      onClick={() => openDeleteModal(workflow)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

WorkflowsTable.propTypes = {
  workflows: PropTypes.array.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default WorkflowsTable;
