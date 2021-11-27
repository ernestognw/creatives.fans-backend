import { Text, Button } from "@chakra-ui/react";
import { IoExitOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { useUser } from "@providers/user";
import { Link } from "react-router-dom";
import { routes } from "@config/constants";
import { useTitle } from "@providers/layout";
import Login from "./login";

const Landing = () => {
  const {
    isLogged,
    user: { username },
    logout,
  } = useUser();
  useTitle("");

  return (
    <>
      <Text textAlign="center" fontSize="lg" my={6}>
        Acepta donaciones de tus fans y sigue financiando tu trabajo creativo
      </Text>
      {isLogged && (
        <Text textAlign="center" fontWeight="800">
          Bienvenido @{username}
        </Text>
      )}
      {!isLogged && <Login />}
      <Link to={routes.CREATIVES}>
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
      </Link>
      {isLogged && (
        <>
          <Link to={routes.DASHBOARD.MAIN}>
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
          </Link>
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
    </>
  );
};

export default Landing;
