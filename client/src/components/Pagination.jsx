import { Button, HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const MAX_PAGE_BUTTONS = 5;

  const generatePageButtons = () => {
    const pageButtons = [];
    let buttonCount = 1;
    for (let page = 1; page <= MAX_PAGE_BUTTONS; page++) {
      buttonCount = buttonCount++;

      let buttonsProps = {
        key: page,
        variant: currentPage === page ? 'solid' : 'outline',
        colorScheme: currentPage === page ? 'blue' : 'gray',
        onClick: page <= totalPages
          ? () => onPageChange(page)
          : () => { },
      }

      pageButtons.push(
        <Button {...buttonsProps}>
          {page <= totalPages ? page : ''}
          { totalPages === 0 && page === 1 ? 1 : '' }
        </Button>
      )
    }

    return pageButtons;
  };

  return (
    <HStack width='auto' justify="center" gap={3}>
      <Button
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        mr={2}
      >
        Anterior
      </Button>
      <HStack gap={1}>
        {
          generatePageButtons()
        }
      </HStack>
      <Button
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        ml={2}
      >
        Siguiente
      </Button>
    </HStack>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
