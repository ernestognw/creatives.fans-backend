import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Spinner,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { Switch, useParams, Route, Link } from "react-router-dom";
import { GET_USER } from "./requests";
import { profileImgFallback } from "@config/constants";
import { useTitle } from "../../providers/layout";
import { routes } from "../../config/constants";
import Sent from "./sent";
import Received from "./received";

const Profile = () => {
  const { username } = useParams();

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  useTitle(`Perfil de @${username}`);

  if (loading)
    return (
      <Flex width="100%" p={20} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="120px"
          src={data?.user.profileImg}
          alt={`${data?.user.firstName} ${data?.user.lastName}`}
          fallbackSrc={profileImgFallback}
          zIndex={10000}
          borderColor="white"
          borderWidth="4px"
          borderStyle="solid"
        />
        <Box
          borderRadius={12}
          backgroundColor="gray.100"
          width="100%"
          pb={6}
          mt={-20}
          pt={10}
        >
          <Heading mt={51} textAlign="center" size="lg">
            {data?.user.firstName} {data?.user.lastName}
          </Heading>
          <Text fontSize={12} color="gray.700" textAlign="center">
            <Text as="span" color="gray.900" fontWeight="800">
              creatives.fans/
            </Text>
            @{username}
          </Text>
        </Box>
        <Tabs
          mt={5}
          width="100%"
          isFitted
          variant="soft-rounded"
          colorScheme="yellow"
        >
          <TabList>
            <Tab
              as={Link}
              to={routes.PROFILE.RECEIVED.replace(":username", username)}
            >
              <Text mr={2}>😎</Text>
              Recibido
            </Tab>
            <Tab
              as={Link}
              to={routes.PROFILE.SENT.replace(":username", username)}
            >
              <Text mr={2}>🤓</Text>
              Enviado
            </Tab>
          </TabList>
          <Switch>
            <Route exact path={routes.PROFILE.RECEIVED} component={Received} />
            <Route exact path={routes.PROFILE.SENT} component={Sent} />
          </Switch>
        </Tabs>
      </Flex>
    </>
  );
};

export default Profile;
