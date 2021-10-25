import { useState } from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Text,
  Grid,
  Heading,
  Spinner,
  Button,
  Input,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import Support from "./support";

const SupportList = ({
  loading,
  onSearch,
  onLoadMore,
  info: { next, count },
  supports,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const [fetchingMore, setFetchingMore] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(search);
  };

  const handleNextPage = async () => {
    setFetchingMore(true);
    await onLoadMore();
    setFetchingMore(false);
  };

  return (
    <Box {...props}>
      <Flex as="form" mb={2} onSubmit={handleSearch}>
        <Input
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          size="lg"
          placeholder="Buscar..."
        />
        <IconButton type="submit" size="lg" ml={2} icon={<SearchIcon />} />
      </Flex>
      {!loading && (
        <Text mb={4} textAlign="right" color="gray.400">
          {count} apoyos en total
        </Text>
      )}
      {loading && (
        <Flex width="100%" p={20} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!loading && count === 0 && (
        <Heading my={20} size="md" textAlign="center">
          No hay apoyos 🙃
        </Heading>
      )}
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        {supports.map(({ id, description, amount, fan, creative }) => (
          <Support
            key={id}
            description={description}
            amount={amount}
            fan={fan}
            creative={creative}
          />
        ))}
      </Grid>
      {next && (
        <Button
          leftIcon={<ChevronDownIcon />}
          variant="outline"
          size="lg"
          mt={5}
          isLoading={fetchingMore}
          disabled={fetchingMore}
          isFullWidth
          onClick={handleNextPage}
        >
          Cargar más
        </Button>
      )}
    </Box>
  );
};

SupportList.defaultProps = {
  info: {
    count: 0,
    next: null,
  },
  supports: [],
};

SupportList.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  info: PropTypes.shape({
    count: PropTypes.number,
    next: PropTypes.number,
  }),
  supports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      amount: PropTypes.number,
      fan: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        profileImg: PropTypes.string,
      }),
      creative: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        profileImg: PropTypes.string,
      }),
    })
  ),
};

export default SupportList;
