import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import PropTypes from "prop-types";
import GoogleButton from "./google";
import FacebookButton from "./facebook";

const AuthModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <GoogleButton onFinish={onClose} />
          <FacebookButton onFinish={onClose} mt="10px" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AuthModal;
