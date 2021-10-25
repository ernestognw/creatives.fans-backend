import { useState } from "react";
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
import { useTitle } from "@providers/layout";
import { useQuery } from "@apollo/client";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { GET_USERS } from "./requests";
import { searchableFields } from "@config/constants/users";
import CreativeCard from "./creative-card";

const pageSize = 10;

const Creatives = () => {
  useTitle("Creativos");
  const [fetchingMore, setFetchingMore] = useState(false);
  const [search, setSearch] = useState("");

  const { data, loading, fetchMore, refetch } = useQuery(GET_USERS, {
    variables: {
      search: searchableFields.reduce((acc, curr) => {
        acc[curr] = search;
        return acc;
      }, {}),
      params: {
        page: 1,
        pageSize,
      },
    },
    fetchPolicy: "cache-first",
  });

  const handleSearch = (event) => {
    event.preventDefault();
    refetch();
  };

  const handleNextPage = async () => {
    setFetchingMore(true);
    await fetchMore({
      variables: {
        params: {
          pageSize,
          page: data?.users.info.next,
        },
      },
    });
    setFetchingMore(false);
  };

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
          {data?.users?.info.count} fans en total
        </Text>
      )}
      {loading && (
        <Flex width="100%" p={20} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Flex>
      )}
      {!loading && data?.users.info.count === 0 && (
        <Heading my={20} size="md" textAlign="center">
          No hay creativos 🙃
        </Heading>
      )}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {data?.users.results.map(
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
      {data?.users.info.next && (
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

export default Creatives;
