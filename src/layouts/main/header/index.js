import { Flex, IconButton, Heading } from "@chakra-ui/react";
import { Logo } from "./styles";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useLayout } from "@providers/layout";

const Header = () => {
  const { goBack } = useHistory();
  const { title } = useLayout();

  return (
    <Flex px={5} my={6} alignItems="center">
      {title && (
        <IconButton
          position="absolute"
          onClick={goBack}
          variant="ghost"
          icon={<ArrowBackIcon boxSize="25" />}
        />
      )}
      <Flex flexGrow={1} justifyContent="center">
        {title ? (
          <Heading size="md">{title}</Heading>
        ) : (
          <Logo src="/logo.svg" alt="Creatives fans" />
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
