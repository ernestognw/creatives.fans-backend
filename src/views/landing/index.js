import { Text, Button } from "@chakra-ui/react";
import MainLayout from "@layouts/main";
import { IoExitOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { useUser } from "@providers/user";
import Login from "./login";

const Landing = () => {
  const {
    isLogged,
    user: { username },
    logout,
  } = useUser();

  return (
    <MainLayout>
      <Text textAlign="center" fontSize="lg" my={6}>
        Acepta donaciones de tus fans y sigue financiando tu trabajo creativo
      </Text>
      {isLogged && (
        <Text textAlign="center" fontWeight="800">
          Bienvenido @{username}
        </Text>
      )}
      {!isLogged && <Login />}
      <Button
        leftIcon={<SearchIcon />}
        mt={5}
        colorScheme="gray"
        variant="outline"
        size="lg"
        isFullWidth
      >
        Creativos
      </Button>
      {isLogged && (
        <>
          <Button
            leftIcon={<MdDashboard />}
            mt={5}
            colorScheme="gray"
            variant="outline"
            size="lg"
            isFullWidth
          >
            Dashboard
          </Button>
          <Button
            onClick={logout}
            leftIcon={<IoExitOutline />}
            mt={5}
            colorScheme="red"
            size="lg"
            isFullWidth
          >
            Salir
          </Button>
        </>
      )}
    </MainLayout>
  );
};

export default Landing;
