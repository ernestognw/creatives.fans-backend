import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  AvatarBadge,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { routes } from "@config/constants";
import { Link } from "react-router-dom";

const Support = ({ description, amount, fan, creative }) => {
  return (
    <Box>
      <Flex mb={2} alignItems="center">
        <Link to={routes.PROFILE.RECEIVED.replace(":username", fan.username)}>
          <Avatar
            height="52px"
            width="52px"
            src={fan.profileImg}
            name={`${fan.firstName} ${fan.lastName}`}
            mr={3}
          >
            {amount > 0 && <AvatarBadge bg="cyan" boxSize="1em" />}
          </Avatar>
        </Link>
        <Link to={routes.PROFILE.RECEIVED.replace(":username", fan.username)}>
          <Box>
            <Heading size="sm">
              {fan.firstName} {fan.lastName}
            </Heading>
            <Text fontSize={14} color="gray.500">
              @{fan.username}
            </Text>
          </Box>
        </Link>
        {amount > 0 && (
          <Tag ml="auto" size="sm" variant="subtle" colorScheme="cyan">
            <TagLabel>${amount}</TagLabel>
          </Tag>
        )}
      </Flex>
      <Box
        fontStyle={description ? "normal" : "italic"}
        borderRadius={12}
        backgroundColor="gray.100"
        width="100%"
        p={3}
      >
        <Text>{description ?? "No hay descripción"}</Text>
        {creative && (
          <Flex mt={2} alignItems="center">
            <Text mr={2} ml="auto" color="gray.400" fontSize="xs">
              Apoyando a @{creative.username}
            </Text>
            <Link
              to={routes.PROFILE.RECEIVED.replace(
                ":username",
                creative.username
              )}
            >
              <Avatar
                size="xs"
                src={creative.profileImg}
                name={`${creative.firstName} ${creative.lastName}`}
              />
            </Link>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

Support.defaultProps = {
  description: "",
};

Support.propTypes = {
  description: PropTypes.string,
};

export default Support;
