import { useTitle } from "@providers/layout";
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa";
import { useUser } from "@providers/user";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { IoExitOutline } from "react-icons/io5";
import { StarIcon, EditIcon } from "@chakra-ui/icons";
import { routes, social } from "@config/constants";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  IconButton,
  Button,
  useClipboard,
} from "@chakra-ui/react";

const Main = () => {
  useTitle("Dashboard");

  const { user, logout } = useUser();

  const { hasCopied, onCopy } = useClipboard(
    `https://creatives.fans/@${user.username}`
  );

  return (
    <>
      <Box borderRadius={12} backgroundColor="gray.100" width="100%" py={6}>
        <Heading textAlign="center" size="lg">
          {user.firstName} {user.lastName}
        </Heading>
        <Text fontSize={12} color="gray.700" textAlign="center">
          <Text as="span" color="gray.900" fontWeight="800">
            creatives.fans/
          </Text>
          @{user.username}
          <IconButton
            size="xs"
            p={0}
            variant="ghost"
            onClick={onCopy}
            icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
          />
        </Text>
        <Flex mt={2} justifyContent="center">
          {user.social?.facebook && (
            <IconButton
              as="a"
              target="_blank"
              href={social.facebook.url(user.social?.facebook)}
              mx={2}
              size="sm"
              variant="ghost"
              icon={<FaFacebook color={social.facebook.color} />}
            />
          )}
          {user.social?.instagram && (
            <IconButton
              as="a"
              target="_blank"
              href={social.instagram.url(user.social?.instagram)}
              mx={2}
              size="sm"
              variant="ghost"
              icon={<FaInstagram color={social.instagram.color} />}
            />
          )}
          {user.social?.twitter && (
            <IconButton
              as="a"
              target="_blank"
              href={social.twitter.url(user.social?.twitter)}
              mx={2}
              size="sm"
              variant="ghost"
              icon={<FaTwitter color={social.twitter.color} />}
            />
          )}
          {user.social?.website && (
            <IconButton
              as="a"
              target="_blank"
              href={user.social?.website}
              mx={2}
              size="sm"
              variant="ghost"
              icon={<FaLink color={social.website.color} />}
            />
          )}
        </Flex>
      </Box>
      <Link to={routes.DASHBOARD.MY_FANS}>
        <Button
          leftIcon={<StarIcon />}
          mt={5}
          colorScheme="gray"
          variant="outline"
          size="lg"
          isFullWidth
        >
          Mis fans
        </Button>
      </Link>
      <Link to={routes.DASHBOARD.EDIT_PROFILE}>
        <Button
          leftIcon={<EditIcon />}
          mt={5}
          colorScheme="gray"
          variant="outline"
          size="lg"
          isFullWidth
        >
          Editar perfi
        </Button>
      </Link>
      <Button
        onClick={logout}
        leftIcon={<IoExitOutline />}
        mt={5}
        colorScheme="red"
        size="lg"
        isFullWidth
      >
        Salir
      </Button>
    </>
  );
};

export default Main;
