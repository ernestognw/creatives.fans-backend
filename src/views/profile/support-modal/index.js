import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { SUPPORT } from "./requests";
import { GET_SUPPORTS_RECEIVED } from "../received/requests";

const SupportModal = ({ isOpen, onClose, creative, refetch }) => {
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");

  const [support] = useMutation(SUPPORT, {
    refetchQueries: [GET_SUPPORTS_RECEIVED],
  });

  const sendSupport = async () => {
    setSubmitting(true);
    await support({
      variables: {
        support: {
          creative,
          description,
        },
      },
    });
    await refetch();
    onClose();
    setDescription("");
    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Envía un apoyo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Mensaje</FormLabel>
            <Textarea
              value={description}
              onChange={({ target: { value } }) => setDescription(value)}
              placeholder="Escribe un mensaje..."
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Cancelar
          </Button>
          <Button
            onClick={sendSupport}
            isLoading={submitting}
            isDisabled={submitting}
            colorScheme="yellow"
          >
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

SupportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SupportModal;
