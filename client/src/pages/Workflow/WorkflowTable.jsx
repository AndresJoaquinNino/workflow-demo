import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { FaCirclePlus, FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { paginateWorkflows } from "./../../repository";
import { Skeleton } from '@chakra-ui/react'
import { useSearchParams } from "react-router-dom";
import { arrayFiller, getUrlParams } from "./../../utils";

const WorkflowsTable = ({ openDeleteModal }) => {

  const ROW_HEIGHT = 8;
  const ROWS_QUANTITY = 10;

  const [searchParams] = useSearchParams();
  const queryParams = getUrlParams(searchParams);

  const {
    data: response,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['workflowTable', queryParams],
    queryFn: () => paginateWorkflows(queryParams),
    refetchOnWindowFocus: false,
  });

  const isFullyLoaded = !isLoading && !isFetching && !isError;

  const tableRows = response ? arrayFiller(response?.data, ROWS_QUANTITY, {}) : [];

  return (
    <Box
      borderWidth='1px'
      borderStyle='solid'
      borderColor='gray.200'
      px={6}
      py={3}
    >
      <HStack justifyContent='space-between' wrap='wrap'>
        <Text fontSize='2xl'>
          Records
        </Text>
        <Link to='/create'>
          <Button rightIcon={<FaCirclePlus size='1.1rem' />} colorScheme="blue">
            New Workflow
          </Button>
        </Link>
      </HStack>
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
              <Th w='10%'>ID</Th>
              <Th w='25%'>Name</Th>
              <Th w='35%'>Description</Th>
              <Th w='20%'>Created at</Th>
              <Th w='10%'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              isFullyLoaded
              &&
              tableRows.map((workflow, index) => (
                <Tr key={workflow?.id ?? index}>
                  <Td>{workflow.id}</Td>
                  <Td>{workflow.name}</Td>
                  <Td>{workflow.description}</Td>
                  <Td>{workflow.created_at}</Td>
                  <Td>
                    {
                      workflow?.id
                      ?
                      <HStack spacing={2}>
                        <IconButton icon={<FaPenToSquare />} colorScheme="teal" size="sm" mr="2" />
                        <IconButton
                          colorScheme="red"
                          size="sm"
                          icon={<FaTrashCan />}
                          onClick={() => openDeleteModal(workflow)}
                        />
                      </HStack>
                      : <Box height={ROW_HEIGHT}></Box>
                    }
                  </Td>
                </Tr>
              ))
            }
            {
              (isLoading || isFetching) &&
              [...Array(ROWS_QUANTITY)].map((element, index) => (
                <Tr key={index}>
                  <Td colSpan="5">
                    <Skeleton height={ROW_HEIGHT}/>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

WorkflowsTable.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
};

export default WorkflowsTable;
