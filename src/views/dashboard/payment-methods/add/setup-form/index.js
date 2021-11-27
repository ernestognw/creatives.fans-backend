import { useCallback, useEffect, useState } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useLocation, useHistory } from "react-router-dom";
import { routes } from "@config/constants";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const SetupForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const { search } = useLocation();
  const { push } = useHistory();

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

    const clientSecret = new URLSearchParams(search).get(
      "setup_intent_client_secret"
    );

    if (!clientSecret) return;

    const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret);

    switch (setupIntent.status) {
      case "succeeded":
        toast({
          title: "Método agregado",
          description: "Tu método de pago se guardó correctamente",
          status: "success",
          isClosable: true,
        });
        push(routes.DASHBOARD.PAYMENT_METHODS.MAIN);
        break;

      case "processing":
        toast({
          title: "Método en proceso de agregarse",
          description:
            "Tu método de pago está siendo procesado. Vuelve en unos minutos",
          status: "success",
          isClosable: true,
        });
        push(routes.DASHBOARD.PAYMENT_METHODS.MAIN);
        break;

      default:
        toast({
          title: "Ocurrió un error",
          description: "Intenta de nuevo o utiliza otro método de pago",
          status: "success",
          isClosable: true,
        });
    }
  }, [search, stripe, toast, push]);

  useEffect(validateStripeCallback, [validateStripeCallback]);

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
