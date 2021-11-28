import { useCallback, useEffect, useState } from "react";
import { Box, Button, useToast, Heading } from "@chakra-ui/react";
import { useUser } from "@providers/user";
import { useHistory } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const SetupForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [validating, setValidating] = useState(false);
  const { reloadUser } = useUser();
  const { go } = useHistory();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setSubmitting(true);
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (error) {
      toast({
        title: "Ocurrió un error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  const validateStripeCallback = useCallback(async () => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "setup_intent_client_secret"
    );

    if (!clientSecret) return;
    setValidating(true);

    const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret);

    switch (setupIntent.status) {
      case "succeeded":
        toast({
          title: "Método agregado",
          description: "Tu método de pago se guardó correctamente",
          status: "success",
          isClosable: true,
        });
        await reloadUser();
        break;

      case "processing":
        toast({
          title: "Método en proceso de agregarse",
          description:
            "Tu método de pago está siendo procesado. Vuelve en unos minutos",
          status: "success",
          isClosable: true,
        });
        break;

      default:
        toast({
          title: "Ocurrió un error",
          description: "Intenta de nuevo o utiliza otro método de pago",
          status: "success",
          isClosable: true,
        });
    }
    go(-2);
  }, [stripe, toast, go, reloadUser]);

  useEffect(() => {
    if (!validating) validateStripeCallback();
  }, [validateStripeCallback, validating]);

  if (
    new URLSearchParams(window.location.search).get(
      "setup_intent_client_secret"
    )
  )
    return (
      <Heading my={20} size="md" textAlign="center">
        Validando tarjeta... 😎
      </Heading>
    );

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Box my={10} as={PaymentElement} />
      <Button
        isLoading={submitting || !stripe}
        isDisabled={submitting || !stripe}
        type="submit"
        colorScheme="yellow"
        size="lg"
        isFullWidth
      >
        Añadir
      </Button>
    </Box>
  );
};

export default SetupForm;
