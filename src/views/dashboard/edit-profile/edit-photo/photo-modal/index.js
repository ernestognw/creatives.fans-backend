import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import Dropzone from "@components/dropzone";

const PhotoModal = ({ isOpen, onClose, setFile, file }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agrega una nueva foto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Dropzone
            defaultMessage="Arrastra tu nueva foto de perfil aquí"
            accept={"image/jpeg, image/png"}
            setFile={setFile}
            file={file}
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="yellow">Subir</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhotoModal;
