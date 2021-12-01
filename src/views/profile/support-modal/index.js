import { useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "@providers/user";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Checkbox,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { SUPPORT } from "./requests";
import { routes } from "@config/constants";
import PaymentCard from "@components/payment-card";
import { GET_SUPPORTS_RECEIVED } from "../received/requests";

const SupportModal = ({ isOpen, onClose, creative, refetch }) => {
  const [submitting, setSubmitting] = useState(false);
  const [tip, setTip] = useState(10);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [sendTip, setSendTip] = useState(false);
  const [description, setDescription] = useState("");
  const toast = useToast();
  const {
    user: { stripeCustomer },
  } = useUser();

  const noPaymentMethods =
    !stripeCustomer || stripeCustomer?.paymentMethods.length === 0;

  const [support] = useMutation(SUPPORT, {
    refetchQueries: [GET_SUPPORTS_RECEIVED],
  });

  const sendSupport = async () => {
    setSubmitting(true);

    const variables = {
      support: {
        creative,
        description,
      },
    };

    if (sendTip) {
      variables.support.amount = Number(tip);
      variables.support.paymentMethod =
        stripeCustomer.paymentMethods[selectedPaymentMethod].id;
    }

    const { errors } = await support({ variables });

    if (errors) {
      toast({
        title: "Ocurrió un error",
        description: errors[0].message,
        status: "success",
        isClosable: true,
      });
    } else {
      if (sendTip) {
        toast({
          title: `¡Gracias por apoyar!`,
          description: "Tu aportación fue recibida",
          status: "error",
          isClosable: true,
        });
      }
      await refetch();
      onClose();
      setDescription("");
      setTip(0);
      setSelectedPaymentMethod(0);
      setSendTip(false);
    }

    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Envía un apoyo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Mensaje</FormLabel>
            <Textarea
              value={description}
              onChange={({ target: { value } }) => setDescription(value)}
              placeholder="Escribe un mensaje..."
            />
          </FormControl>
          <Flex flexDirection="column">
            <Checkbox
              my={3}
              onChange={({ target: { checked } }) => setSendTip(checked)}
              isDisabled={noPaymentMethods}
              isChecked={sendTip}
            >
              {noPaymentMethods
                ? "No has agregado métodos de pago"
                : "Agregar propina"}
            </Checkbox>
            {noPaymentMethods && (
              <Link to={routes.DASHBOARD.PAYMENT_METHODS.ADD}>
                <Button colorScheme="yellow" variant="link">
                  Agregar método de pago
                </Button>
              </Link>
            )}
            {sendTip && !noPaymentMethods && (
              <>
                <FormControl mb={4} id="amount">
                  <FormLabel>Cantidad (MXN)</FormLabel>
                  <NumberInput
                    onChange={(val) => setTip(val.replace(/^\$/, ""))}
                    value={`$${tip}`}
                    min={10}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Text mb={3} color="gray.500">
                  Selecciona tu método de pago
                </Text>
                {stripeCustomer?.paymentMethods.map(({ id, card }, index) => (
                  <PaymentCard
                    key={id}
                    brand={card.brand}
                    expirationYear={card.expirationYear}
                    expirationMonth={card.expirationMonth}
                    funding={card.funding}
                    last4={card.last4}
                    mb={3}
                    cursor="pointer"
                    borderColor={
                      index === selectedPaymentMethod ? "green" : undefined
                    }
                    onClick={() => setSelectedPaymentMethod(index)}
                  />
                ))}
              </>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Cancelar
          </Button>
          <Button
            onClick={sendSupport}
            isLoading={submitting}
            isDisabled={submitting}
            colorScheme="yellow"
          >
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

SupportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SupportModal;
