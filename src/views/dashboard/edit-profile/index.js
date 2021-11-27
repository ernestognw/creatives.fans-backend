import { useUser } from "@providers/user";
import { useTitle } from "@providers/layout";
import { Flex, Spinner, Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "@config/constants";
import UserForm from "./user-form";
import EditPhoto from "./edit-photo";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "./requests";

const EditProfile = () => {
  useTitle("Editar perfil");
  const [updateUser] = useMutation(UPDATE_USER);
  const toast = useToast();

  const { user, loadingUser, token } = useUser();

  const onSubmit = async (user) => {
    const { errors } = await updateUser({
      variables: { user: user },
    });

    if (errors) {
      toast({
        title: "Ocurrió un error",
        description: errors[0].message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido actualizados con éxito",
        status: "success",
        isClosable: true,
      });
    }
  };

  if (!token || loadingUser)
    return (
      <Flex width="100%" p={20} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );

  return (
    <>
      <EditPhoto
        userId={user.id}
        profileImg={user.profileImg}
        firstName={user.firstName}
        lastName={user.lastName}
        onSave={onSubmit}
      />
      <UserForm
        defaultValues={{
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
        }}
        onSubmit={onSubmit}
      />
      <Link to={routes.PROFILE.RECEIVED.replace(":username", user.username)}>
        <Button mt={5} colorScheme="yellow" variant="link" isFullWidth>
          Ir a tu perfil
        </Button>
      </Link>
    </>
  );
};

export default EditProfile;
