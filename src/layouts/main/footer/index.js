import { Flex, Text, Box, Link } from "@chakra-ui/react";
import { Icon, Logo } from "./styles";

const Footer = () => {
  return (
    <Box py={5}>
      <Flex alignItems="center" justifyContent="center">
        <Icon src="./face.png" alt="Creatives fans" mr="5px" />
        <Logo src="./logo.svg" alt="Creatives fans" />
        <Text fontWeight="800" ml="5px" fontSize="sm">
          © {new Date().getFullYear()}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Link mx="5px" fontSize="sm">
          FAQs
        </Link>
        •
        <Link mx="5px" fontSize="sm">
          Términos
        </Link>
        •
        <Link mx="5px" fontSize="sm">
          Privacidad
        </Link>
        •
        <Link mx="5px" fontSize="sm">
          ES / EN
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
