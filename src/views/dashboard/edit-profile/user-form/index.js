import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  Box,
} from "@chakra-ui/react";
import { useApolloClient } from "@apollo/client";
import { BiUserCircle, BiMenu } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { USERNAME_EXISTS } from "./requests";

const UserForm = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ defaultValues, reValidateMode: "onBlur" });
  const { query } = useApolloClient();

  const checkUsername = async (username) => {
    if (username === defaultValues?.username) return true;
    const {
      data: { usernameExists },
    } = await query({
      query: USERNAME_EXISTS,
      variables: {
        username,
      },
      fetchPolicy: "network-only",
    });

    if (usernameExists) return "Este username ya esta tomado";
    return true
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={5} isInvalid={errors.username}>
        <FormLabel>Username</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Box as={BiUserCircle} color="gray.300" />}
          />
          <Input
            {...register("username", {
              required: "Este campo es requerido",
              validate: checkUsername,
            })}
            isInvalid={errors.username}
            placeholder="Username"
          />
        </InputGroup>
        {errors.username && (
          <FormHelperText>{errors.username.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl mb={5} isInvalid={errors.firstName}>
        <FormLabel>Nombre</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Box as={BiMenu} color="gray.300" />}
          />
          <Input
            {...register("firstName", {
              required: "Este campo es requerido",
            })}
            isInvalid={errors.firstName}
            placeholder="Nombre"
          />
        </InputGroup>
        {errors.firstName && (
          <FormHelperText>{errors.firstName.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl mb={5} isInvalid={errors.lastName}>
        <FormLabel>Apellidos</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Box as={BiMenu} color="gray.300" />}
          />
          <Input
            {...register("lastName", {
              required: "Este campo es requerido",
            })}
            isInvalid={errors.lastName}
            placeholder="Apellidos"
          />
        </InputGroup>
        {errors.lastName && (
          <FormHelperText>{errors.lastName.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl mb={5}>
        <FormLabel>Bio</FormLabel>
        <Textarea
          {...register("description")}
          isInvalid={errors.description}
          placeholder="Bio"
        />
      </FormControl>
      <Button
        isLoading={isSubmitting}
        mt={5}
        type="submit"
        colorScheme="yellow"
        size="lg"
        isFullWidth
      >
        Guardar
      </Button>
    </Box>
  );
};

UserForm.defaultProps = {};

UserForm.propTypes = {};

export default UserForm;
