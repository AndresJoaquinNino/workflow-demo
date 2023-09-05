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
} from "@chakra-ui/react";

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
      height="100vh"
      bg="gray.100"
      p={3}
    >
      <Card px={6} py={2} rounded="md" shadow="md">
        <CardHeader>
          <HStack justifyContent='space-between'>
            <Heading>
              My Workflows
            </Heading>
            <Button colorScheme="blue" size="sm">
              New Workflow
            </Button>
          </HStack>
        </CardHeader>
        <TableContainer>
          <Table
            variant="simple"
            __css={{
              'table-layout': 'fixed',
              width: 'full'
            }}
          >
            <Thead>
              <Tr>
                <Th w={25}>ID</Th>
                <Th w={25}>Name</Th>
                <Th w={25}>Created at</Th>
                <Th w={25}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {workflows.map((workflow) => (
                <Tr key={workflow.id}>
                  <Td>{workflow.id}</Td>
                  <Td>{workflow.name}</Td>
                  <Td>{workflow.created_at}</Td>
                  <Td>
                    <Button colorScheme="teal" size="sm" mr="2">
                      Details
                    </Button>
                    <Button colorScheme="blue" size="sm" mr="2">
                      Edit
                    </Button>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
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
