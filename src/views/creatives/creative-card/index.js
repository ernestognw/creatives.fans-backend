import { Box, Flex, Text, Heading, Avatar } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { routes } from "@config/constants";

const CreativeCard = ({ username, firstName, lastName, profileImg }) => {
  return (
    <Link to={routes.PROFILE.RECEIVED.replace(":username", username)}>
      <Flex direction="column" alignItems="center">
        <Avatar
          size="lg"
          src={profileImg}
          name={`${firstName} ${lastName}`}
          showBorder
          borderWidth="4px"
        />
        <Box
          borderRadius={12}
          backgroundColor="gray.100"
          width="100%"
          pb={6}
          mt={-10}
          pt={10}
        >
          <Heading mt={3} textAlign="center" size="sm">
            {firstName} {lastName}
          </Heading>
          <Text fontSize={14} color="gray.500" textAlign="center">
            @{username}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

CreativeCard.defaultProps = {
  profileImg: "",
};

CreativeCard.propTypes = {
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImg: PropTypes.string,
};

export default CreativeCard;
