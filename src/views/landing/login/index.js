import { Button } from "@chakra-ui/react";
import { useState } from "react";
import AuthModal from "@components/auth-modal";

const Login = () => {
  const [isOpenModal, toggleOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => toggleOpenModal(true)}
        colorScheme="yellow"
        size="lg"
        isFullWidth
      >
        Inicia Sesión
      </Button>
      <AuthModal isOpen={isOpenModal} onClose={() => toggleOpenModal(false)} />
    </>
  );
};

export default Login;
