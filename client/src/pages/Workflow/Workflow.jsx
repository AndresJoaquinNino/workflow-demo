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
  Flex,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaCirclePlus, FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";

const workflows = [
  { id: 1, name: "Workflow 1", created_at: "2023-09-01" },
  { id: 2, name: "Workflow 2", created_at: "2023-09-02" },
  { id: 3, name: "Workflow 3", created_at: "2023-09-03" },
  { id: 4, name: "Workflow 4", created_at: "2023-09-04" },
  { id: 5, name: "Workflow 5", created_at: "2023-09-05" },
  { id: 6, name: "Workflow 6", created_at: "2023-09-06" },
  { id: 7, name: "Workflow 7", created_at: "2023-09-07" },
  { id: 8, name: "Workflow 8", created_at: "2023-09-08" },
  { id: 9, name: "Workflow 9", created_at: "2023-09-09" },
  { id: 10, name: "Workflow 10", created_at: "2023-09-10" },
];

const WorkflowsPage = () => {
  return (
    <Flex
      direction='column'
      minHeight="100vh"
      bg="gray.100"
      p={3}
    >
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
                      <IconButton icon={<FaTrashCan />} colorScheme="red" size="sm" />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Flex>
  );
};

export default WorkflowsPage;
