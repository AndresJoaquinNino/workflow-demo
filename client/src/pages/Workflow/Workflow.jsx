import { Flex, } from "@chakra-ui/react";
import { WorkflowTable } from ".";

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

const Workflows = () => {
  return (
    <Flex
      direction='column'
      minHeight="100vh"
      bg="gray.100"
      p={3}
    >
      <WorkflowTable workflows={workflows} />
    </Flex>
  );
};

export default Workflows;
