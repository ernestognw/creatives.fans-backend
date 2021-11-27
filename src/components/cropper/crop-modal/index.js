import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { MdFlip } from "react-icons/md";
import { getCroppedBlob } from "./helpers";
import { ThumbContainer, FlipButton } from "./elements";

const CropModal = ({
  imageSrc,
  imageName,
  title,
  confirm,
  cancel,
  aspectRatio,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixelsToSet) => {
    setCroppedAreaPixels(croppedAreaPixelsToSet);
  }, []);

  const save = useCallback(async () => {
    const croppedBlob = await getCroppedBlob(
      imageSrc,
      croppedAreaPixels,
      rotation,
      flip
    );
    const croppedImage = new File([croppedBlob], imageName);
    confirm(croppedImage);
  }, [croppedAreaPixels, rotation, confirm, flip, imageName, imageSrc]);

  return (
    <Modal size="xl" isOpen onClose={cancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box height={400} my={20} position="relative">
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              transform={[
                `translate(${crop.x}px, ${crop.y}px)`,
                `rotateZ(${rotation}deg)`,
                `rotateY(${flip.horizontal ? 180 : 0}deg)`,
                `rotateX(${flip.vertical ? 180 : 0}deg)`,
                `scale(${zoom})`,
              ].join(" ")}
            />
          </Box>
          <ThumbContainer>
            <Box display="flex" flexDirection="column" flexGrow="1">
              <Box display="flex" alignItems="center">
                <Text color="gray.500" mr={10}>
                  Zoom
                </Text>
                <Slider
                  defaultValue={50}
                  size="lg"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={setZoom}
                >
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb backgroundColor="yellow.400" size={20} />
                </Slider>
              </Box>
              <Box display="flex" alignItems="center">
                <Text color="gray.500" mr={10}>
                  Rotación
                </Text>
                <Slider
                  defaultValue={50}
                  size="lg"
                  value={rotation}
                  flex="1"
                  min={0}
                  max={360}
                  step={1}
                  onChange={setRotation}
                >
                  <SliderTrack />
                  <SliderFilledTrack />
                  <SliderThumb backgroundColor="yellow.400" size={20} />
                </Slider>
              </Box>
            </Box>
            <Box display="flex" ml={10}>
              <FlipButton
                mr={10}
                as={MdFlip}
                onClick={() => {
                  setFlip((prev) => ({
                    horizontal: !prev.horizontal,
                    vertical: prev.vertical,
                  }));
                  setRotation((prev) => 360 - prev);
                }}
              />
              <FlipButton
                as={MdFlip}
                rotate="true"
                onClick={() => {
                  setFlip((prev) => ({
                    horizontal: prev.horizontal,
                    vertical: !prev.vertical,
                  }));
                  setRotation((prev) => 360 - prev);
                }}
              />
            </Box>
          </ThumbContainer>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={cancel}>
            Cancelar
          </Button>
          <Button colorScheme="yellow" onClick={save}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CropModal.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  aspectRatio: PropTypes.number.isRequired,
};

export default CropModal;
