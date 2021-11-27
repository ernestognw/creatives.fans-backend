import {
  Input,
  IconButton,
  Grid,
  Flex,
  Spinner,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import CreativeCard from "@components/creative-card";

const CreativesList = ({
  handleSearch,
  search,
  setSearch,
  loading,
  users,
  fetchingMore,
  handleNextPage,
  emptyMessage,
}) => {
  return (
    <>
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
          {users.info?.count} fans en total
        </Text>
      )}
      {loading && (
        <Flex width="100%" p={20} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!loading && users.info?.count === 0 && (
        <Heading my={20} size="md" textAlign="center">
          {emptyMessage}
        </Heading>
      )}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {users.results?.map(
          ({ id, username, firstName, lastName, profileImg }) => (
            <CreativeCard
              key={id}
              username={username}
              firstName={firstName}
              lastName={lastName}
              profileImg={profileImg}
            />
          )
        )}
      </Grid>
      {users.info?.next && (
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
    </>
  );
};

CreativesList.defaultProps = {
  loading: false,
  fetchingMore: false,
  handleNextPage: () => {},
  users: {},
  emptyMessage: "No hay creativos 🙃",
};

CreativesList.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  users: PropTypes.shape({
    info: PropTypes.shape({
      next: PropTypes.number,
      count: PropTypes.number,
    }),
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        profileImg: PropTypes.string,
      })
    ),
  }),
  fetchingMore: PropTypes.bool,
  handleNextPage: PropTypes.func,
  emptyMessage: PropTypes.string,
};

export default CreativesList;
