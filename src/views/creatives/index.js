import { useMemo, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Flex,
  Spinner,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import { useTitle } from "@providers/layout";
import { useQuery } from "@apollo/client";
import { SearchIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { GET_USERS } from "./requests";
import { searchableFields } from "@config/constants/users";
import CreativeCard from "./creative-card";

const Creatives = () => {
  useTitle("Creativos");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);

  const search = useMemo(
    () =>
      searchableFields.reduce((acc, curr) => {
        acc[curr] = debouncedSearch;
        return acc;
      }, {}),
    [debouncedSearch]
  );

  const { data, loading } = useQuery(GET_USERS, {
    variables: {
      search,
      params: {
        page,
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <InputGroup mb={6}>
        <InputLeftElement
          pointerEvents="none"
          height="100%"
          children={<SearchIcon boxSize="19" color="gray.300" />}
        />
        <Input
          value={searchInput}
          onChange={({ target: { value } }) => {
            setSearchInput(value);
            setPage(1);
          }}
          size="lg"
          placeholder="Buscar..."
        />
      </InputGroup>
      <Flex justifyContent="space-between" mb={5}>
        <Text color="gray.400">
          Página {page} de {data?.users?.info.pages}
        </Text>
        <Text color="gray.400">{data?.users?.info.count} fans en total</Text>
      </Flex>
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
      <Flex mt={5} justifyContent="space-between">
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="outline"
          size="lg"
          onClick={() => setPage(data?.users.info.prev)}
          disabled={!data?.users.info.prev}
        >
          Anterior
        </Button>
        <Button
          rightIcon={<ArrowForwardIcon />}
          variant="outline"
          size="lg"
          onClick={() => setPage(data?.users.info.next)}
          disabled={!data?.users.info.next}
        >
          Siguiente
        </Button>
      </Flex>
    </>
  );
};

export default Creatives;
