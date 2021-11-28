import { Button, Flex, Spinner, Heading } from "@chakra-ui/react";
import { useTitle } from "@providers/layout";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { routes } from "@config/constants";
import { useUser } from "@providers/user";
import PaymentCard from "@components/payment-card";

const Main = () => {
  useTitle("Métodos de pago");

  const {
    user: { stripeCustomer },
    loadingUser,
    token,
  } = useUser();

  if (!token || loadingUser)
    return (
      <Flex width="100%" p={20} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );

  return (
    <>
      {stripeCustomer?.paymentMethods.map(({ id, card }) => (
        <PaymentCard
          key={id}
          brand={card.brand}
          expirationYear={card.expirationYear}
          expirationMonth={card.expirationMonth}
          funding={card.funding}
          last4={card.last4}
          mb={3}
        />
      ))}
      {!loadingUser &&
        (!stripeCustomer || stripeCustomer?.paymentMethods.length === 0) && (
          <Heading my={20} size="md" textAlign="center">
            Todavía no tienes métodos de pago 😭
          </Heading>
        )}
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
