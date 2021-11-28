import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Heading,
  Spinner,
  Tabs,
  TabList,
  Tab,
  Button,
  IconButton,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa";
import { Switch, useParams, Route, Link } from "react-router-dom";
import { GET_USER } from "./requests";
import { useTitle } from "@providers/layout";
import { routes, social } from "@config/constants";
import Sent from "./sent";
import { useUser } from "@providers/user";
import Received from "./received";
import SupportModal from "./support-modal";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";

const Profile = () => {
  const { username } = useParams();
  useTitle(`Perfil de @${username}`);
  const toast = useToast();
  const { user } = useUser();
  const [isSupportModalOpen, toggleSupportModal] = useState(false);
  const isOwner = username === user.username;

  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  const { hasCopied, onCopy } = useClipboard(
    `https://creatives.fans/@${username}`
  );

  if (loading)
    return (
      <Flex width="100%" p={20} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Avatar
          size="2xl"
          src={data?.user.profileImg}
          name={`${data?.user.firstName} ${data?.user.lastName}`}
          showBorder
          borderWidth="4px"
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
            <IconButton
              size="xs"
              p={0}
              variant="ghost"
              onClick={onCopy}
              icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
            />
          </Text>
          <Flex mt={2} justifyContent="center">
            {data?.user.social.facebook && (
              <IconButton
                as="a"
                target="_blank"
                href={social.facebook.url(data?.user.social.facebook)}
                mx={2}
                size="sm"
                variant="ghost"
                icon={<FaFacebook color={social.facebook.color} />}
              />
            )}
            {data?.user.social.instagram && (
              <IconButton
                as="a"
                target="_blank"
                href={social.instagram.url(data?.user.social.instagram)}
                mx={2}
                size="sm"
                variant="ghost"
                icon={<FaInstagram color={social.instagram.color} />}
              />
            )}
            {data?.user.social.twitter && (
              <IconButton
                as="a"
                target="_blank"
                href={social.twitter.url(data?.user.social.twitter)}
                mx={2}
                size="sm"
                variant="ghost"
                icon={<FaTwitter color={social.twitter.color} />}
              />
            )}
            {data?.user.social.website && (
              <IconButton
                as="a"
                target="_blank"
                href={data?.user.social.website}
                mx={2}
                size="sm"
                variant="ghost"
                icon={<FaLink color={social.website.color} />}
              />
            )}
          </Flex>
        </Box>
        <Button
          onClick={() =>
            isOwner
              ? toast({
                  title: "¡Alto ahí vaquero!",
                  description: "No puedes enviarte apoyos a ti mismo",
                  status: "warning",
                  isClosable: true,
                })
              : toggleSupportModal(true)
          }
          size="lg"
          mt={5}
          isFullWidth
          colorScheme="yellow"
        >
          Apóyame 🖤
        </Button>
        <Box
          mt={5}
          borderRadius={12}
          backgroundColor="gray.100"
          width="100%"
          p={3}
          fontStyle={data?.user?.description ? "normal" : "italic"}
        >
          {data?.user?.description ?? "Sin descripción"}
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
              replace
              to={routes.PROFILE.RECEIVED.replace(":username", username)}
            >
              <Text mr={2}>😎</Text>
              Recibido ({data?.user.supportsReceived.info.count})
            </Tab>
            <Tab
              as={Link}
              replace
              to={routes.PROFILE.SENT.replace(":username", username)}
            >
              <Text mr={2}>🤓</Text>
              Enviado ({data?.user.supportsGiven.info.count})
            </Tab>
          </TabList>
          <Switch>
            <Route
              exact
              path={routes.PROFILE.RECEIVED}
              render={() => <Received creative={data?.user.id} />}
            />
            <Route
              exact
              path={routes.PROFILE.SENT}
              render={() => <Sent fan={data?.user.id} />}
            />
          </Switch>
        </Tabs>
      </Flex>
      <SupportModal
        creative={data?.user?.id}
        refetch={refetch}
        isOpen={isSupportModalOpen}
        onClose={() => toggleSupportModal(false)}
      />
    </>
  );
};

export default Profile;
