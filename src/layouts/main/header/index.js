import { Flex } from "@chakra-ui/react";
import { Logo } from "./styles";

const Header = () => {
  return (
    <Flex my="10px" justifyContent="center">
      <Logo src="./logo.svg" alt="Creatives fans" />
    </Flex>
  );
};

export default Header;
