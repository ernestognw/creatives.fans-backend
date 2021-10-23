import { Text, Button } from "@chakra-ui/react";
import MainLayout from "@layouts/main";
import { SearchIcon } from "@chakra-ui/icons";

const Landing = () => {
  return (
    <MainLayout>
      <Text textAlign="center" fontSize="lg" my={6}>
        Acepta donaciones de tus fans y sigue financiando tu trabajo creativo
      </Text>
      <Button colorScheme="yellow" size="lg" isFullWidth>
        Inicia Sesión
      </Button>
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
    </MainLayout>
  );
};

export default Landing;
