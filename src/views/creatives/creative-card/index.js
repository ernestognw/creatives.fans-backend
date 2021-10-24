import { Box, Flex, Text, Image, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { profileImgFallback } from "@config/constants";

const CreativeCard = ({ username, firstName, lastName, profileImg }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="70px"
        src={profileImg}
        alt={`${firstName} ${lastName}`}
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
