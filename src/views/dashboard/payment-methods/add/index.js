import { useTitle } from "@providers/layout";
import { useQuery } from "@apollo/client";
import { Flex, Spinner } from "@chakra-ui/react";
import { REQUEST_STRIPE_INTENT } from "./requests";
import { useUser } from "@providers/user";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripe } from "@config/environment";
import SetupForm from "./setup-form";

const stripePromise = loadStripe(stripe.publicKey);

const Add = () => {
  useTitle("Añadir método de pago");
  const { token } = useUser();

  const { data, loading } = useQuery(REQUEST_STRIPE_INTENT, { skip: !token });

  if (loading || !data)
    return (
      <Flex width="100%" p={20} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: data.stripeSetupIntentByToken.clientSecret,
      }}
    >
      <SetupForm />
    </Elements>
  );
};

export default Add;
