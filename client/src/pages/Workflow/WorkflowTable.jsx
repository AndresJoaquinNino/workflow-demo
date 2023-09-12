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
import { FaCirclePlus, FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { paginateWorkflows } from "./../../repository";
import { Skeleton } from '@chakra-ui/react'
import { useSearchParams, } from "react-router-dom";
import { arrayFiller, getUrlParams } from "./../../utils";
import { Pagination } from "./../../components";
import { useNotificationContext } from "./../../context/Notification";

const WorkflowsTable = ({ openDeleteModal, openCreateModal }) => {

  const ROW_HEIGHT = 8;
  const ROWS_QUANTITY = 10;

  const [searchParams, setSearchParams] = useSearchParams();
  if (searchParams.get('page') === null) searchParams.set('page', 1);
  const queryParams = getUrlParams(searchParams);

  const onErrorFetch = (error) => {
    addNotification({
      message: error?.message ?? 'Something went wrong',
      type: 'error',
      autoDelete: false,
    });
  }

  const {
    data: response,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['workflowTable', queryParams],
    queryFn: () => paginateWorkflows(queryParams),
    onError: onErrorFetch,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { addNotification } = useNotificationContext();

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
        <Button
          colorScheme="blue"
          onClick={openCreateModal}
          rightIcon={
            <FaCirclePlus size='1.1rem' />
          }
        >
          New Workflow
        </Button>
      </HStack>
      <TableContainer mb={5}>
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
                    <Skeleton height={ROW_HEIGHT} />
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
      {
        isFullyLoaded
        &&
        <Pagination
          currentPage={parseInt(response?.currentPage, 10)}
          totalPages={response?.totalPages}
          onPageChange={(page) => {
            queryParams.page = page;
            setSearchParams(queryParams);
          }}
        />
      }
      {
        (isLoading || isFetching)
        &&
        <Skeleton height={ROW_HEIGHT} width='50%' mr='auto' ml='auto' />
      }
    </Box>
  );
};

WorkflowsTable.propTypes = {
  openCreateModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default WorkflowsTable;
