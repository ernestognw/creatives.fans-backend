import { useState } from "react";
import PropTypes from "prop-types";
import { FaGoogle } from "react-icons/fa";
import { Button, useToast } from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { useUser } from "@providers/user";
import { client } from "@utils/auth";
import { google } from "@config/environment";

const GoogleButton = ({ onFinish, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useUser();
  const toast = useToast();

  const onSuccess = async (googleUser) => {
    const idToken = googleUser.tokenObj.id_token;

    try {
      await client.post("/login/google", { googleIdToken: idToken });
      onFinish();
      setLoading(false);
      setIsLogged(true);
    } catch (err) {
      toast({
        title: "An error has occurred",
        description: err.message,
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const onFailure = (err) => {
    if (err.error !== "popup_closed_by_user") {
      toast({
        title: "An error has occurred",
        status: "error",
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const startLogin = (onClick) => {
    setLoading(true);
    onClick();
  };

  return (
    <GoogleLogin
      clientId={google.clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={(renderProps) => (
        <Button
          colorScheme="gray"
          variant="outline"
          isFullWidth
          disabled={renderProps.disabled || loading}
          leftIcon={<FaGoogle />}
          isLoading={loading}
          onClick={() => startLogin(renderProps.onClick)}
          {...props}
        >
          Inicia con Google
        </Button>
      )}
      cookiePolicy="single_host_origin"
    />
  );
};

GoogleButton.defaultProps = {
  onFinish: () => {},
};

GoogleButton.propTypes = {
  onFinish: PropTypes.func,
};

export default GoogleButton;
