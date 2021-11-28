import { useState } from "react";
import {
  Button,
  Flex,
  Spinner,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useTitle } from "@providers/layout";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { routes } from "@config/constants";
import { DeleteIcon } from "@chakra-ui/icons";
import { useUser } from "@providers/user";
import PaymentCard from "@components/payment-card";
import { useMutation } from "@apollo/client";
import { DETACH_PAYMENT_METHOD } from "./requests";

const Main = () => {
  useTitle("Métodos de pago");
  const [toDelete, setToDelete] = useState(null);
  const [detaching, setDetaching] = useState(false);
  const [detach] = useMutation(DETACH_PAYMENT_METHOD);
  const toast = useToast();

  const {
    user: { stripeCustomer },
    loadingUser,
    token,
    reloadUser,
  } = useUser();

  const removePaymentMethod = async () => {
    setDetaching(true);
    const { errors } = await detach({
      variables: {
        id: toDelete.id,
      },
    });
    if (errors) {
      toast({
        title: "Ocurrió un error",
        description: errors[0].message,
        status: "error",
        isClosable: true,
      });
    } else {
      await reloadUser();
      setToDelete(null);
      toast({
        title: "Método removido",
        description: "El método ha sido removido",
        status: "success",
        isClosable: true,
      });
    }

    setDetaching(false);
  };

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
          extra={
            <IconButton
              variant="link"
              colorScheme="gray"
              size="xs"
              onClick={() => setToDelete({ ...card, id })}
              icon={<DeleteIcon />}
            />
          }
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
      <Modal isCentered onClose={() => setToDelete(null)} isOpen={!!toDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar método de pago</ModalHeader>
          <ModalCloseButton />
          <ModalBody size="sm" pb={5}>
            <Text textAlign="center" mb={6}>
              ¿Estás seguro que desea eliminar el método de pago con terminación{" "}
              {toDelete?.last4}?
            </Text>
            <Flex justifyContent="center">
              <Button mr={3} onClick={() => setToDelete(null)} variant="ghost">
                Cancelar
              </Button>
              <Button
                onClick={removePaymentMethod}
                ml={3}
                colorScheme="yellow"
                mr={3}
                isLoading={detaching}
                isDisabled={detaching}
              >
                Eliminar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Main;
