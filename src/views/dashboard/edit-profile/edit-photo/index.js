import { useState } from "react";
import PropTypes from "prop-types";
import crop from "@components/cropper";
import { Avatar, Flex, Button } from "@chakra-ui/react";
import useUpload from "@hooks/use-upload";
import PhotoModal from "./photo-modal";

const EditPhoto = ({ userId, profileImg, firstName, lastName, onSave }) => {
  const [isOpenPhotoModal, togglePhotoModal] = useState(false);
  const { upload, uploading } = useUpload();

  const setPhotoFile = async (imageFile) => {
    togglePhotoModal(false);
    const image = await crop({
      imageFile,
      ratio: 1,
      title: "Recorta el cover de tu hackathon",
    });
    if (image) {
      const url = await upload(image, `/users/${userId}/${image.name}`);
      await onSave({ profileImg: url });
    }
  };

  return (
    <>
      <Flex flexDirection="column" alignItems="center">
        <Avatar
          size="2xl"
          src={profileImg}
          name={`${firstName} ${lastName}`}
          showBorder
          borderWidth="4px"
          opacity={uploading ? 0.4 : 1}
        />
        <Button
          onClick={() => togglePhotoModal(true)}
          mt={2}
          mb={7}
          colorScheme="yellow"
          variant="link"
        >
          Cambiar foto
        </Button>
      </Flex>
      <PhotoModal
        isOpen={isOpenPhotoModal}
        onClose={() => togglePhotoModal(false)}
        setFile={setPhotoFile}
      />
    </>
  );
};

EditPhoto.defaultProps = {
  userId: "",
  profileImg: "",
  firstName: "",
  lastName: "",
};

EditPhoto.propTypes = {
  userId: PropTypes.string,
  profileImg: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default EditPhoto;
