import { Text, Button } from "@chakra-ui/react";
import { useTitle } from "@providers/layout";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { routes } from "@config/constants";

const Main = () => {
  useTitle("Métodos de pago");

  return (
    <>
      <Text textAlign="center">In progress...</Text>
      <Link to={routes.DASHBOARD.PAYMENT_METHODS.ADD}>
        <Button
          leftIcon={<AddIcon />}
          mt={5}
          colorScheme="gray"
          variant="outline"
          size="lg"
          isFullWidth
        >
          Añadir un método de pago
        </Button>
      </Link>
    </>
  );
};

export default Main;
