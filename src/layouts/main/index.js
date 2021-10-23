import { Flex, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Header from "./header";
import Footer from "./footer";

const MainLayout = ({ children }) => {
  return (
    <Flex minH="100vh" maxW={600} mr="auto" ml="auto" direction="column">
      <Header />
      <Box px={5} flex={1}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
