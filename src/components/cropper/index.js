import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import CropModal from "./crop-modal";

const crop = ({ imageFile, aspectRatio = 1, title = "Recortar imagen" }) => {
  // Inside of component because if we put this out, ssr would crash,
  // due to inexistence of document at server
  const modalRoot = document.getElementById("cropper");

  return new Promise((resolve) => {
    const modalContainer = document.createElement("div");
    modalRoot.appendChild(modalContainer);

    const confirm = (croppedFile) => {
      resolve(croppedFile);
      ReactDOM.unmountComponentAtNode(modalContainer);
      modalRoot.removeChild(modalContainer);
    };

    const cancel = () => {
      resolve(false);
      ReactDOM.unmountComponentAtNode(modalContainer);
      modalRoot.removeChild(modalContainer);
    };

    ReactDOM.render(
      <ChakraProvider>
        <CropModal
          imageSrc={URL.createObjectURL(imageFile)}
          imageName={imageFile.name}
          aspectRatio={aspectRatio}
          title={title}
          confirm={confirm}
          cancel={cancel}
        />
      </ChakraProvider>,
      modalContainer
    );
  });
};

export default crop;
