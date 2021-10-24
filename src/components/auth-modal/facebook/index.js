import { useState } from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa";
import { Button, useToast } from "@chakra-ui/react";
import { useUser } from "@providers/user";
import { facebook } from "@config/environment";
import { client } from "@utils/auth";

const FacebookButton = ({ onFinish, ...props }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useUser();

  const onSuccess = async (response) => {
    if (response.status) {
      onFailure();
      return;
    }

    const { accessToken } = response;
    console.log(response)

    try {
      await client.post("/login/facebook", { fbAccessToken: accessToken });
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

  const onFailure = () => {
    toast({
      title: "An error has occurred",
      status: "error",
      isClosable: true,
    });
    setLoading(false);
  };

  const startLogin = (onClick) => {
    setLoading(true);
    onClick();
  };

  return (
    <FacebookLogin
      appId={facebook.appId}
      version="4.0"
      authType="rerequest"
      isMobile={false}
      render={(renderProps) => (
        <Button
          colorScheme="blue"
          variant="outline"
          isFullWidth
          size="lg"
          disabled={renderProps.isDisabled}
          leftIcon={<FaFacebookF />}
          isLoading={loading}
          onClick={() => startLogin(renderProps.onClick)}
          {...props}
        >
          Inicia con Facebook
        </Button>
      )}
      fields="last_name,first_name,email,picture.width(400).height(400)"
      callback={onSuccess}
    />
  );
};

FacebookButton.defaultProps = {
  onFinish: () => {},
};

FacebookButton.propTypes = {
  onFinish: PropTypes.func,
};

export default FacebookButton;
