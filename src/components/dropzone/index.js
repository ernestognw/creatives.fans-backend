import { useCallback } from "react";
import { Box, Flex, Text, useTheme, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { MdInsertDriveFile } from "react-icons/md";
import { Container } from "./elements";

const extensionsTable = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

const Dropzone = ({
  acceptMessage,
  rejectMessage,
  defaultMessage,
  accept,
  setFile,
  maxSize,
  file,
  height,
}) => {
  const toast = useToast();

  const onDropAccepted = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const onDropRejected = useCallback(
    (rejectedFiles) => {
      if (rejectedFiles[0].file.size > maxSize) {
        toast({
          title: "Archivo muy grande",
          description: `El tamaño máximo es de ${maxSize / 1000000}MB`,
          status: "warning",
          isClosable: true,
        });
      }
    },
    [maxSize, toast]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    onDropAccepted,
    onDropRejected,
    multiple: false,
    maxSize,
  });

  const theme = useTheme();

  return (
    <Container
      height={height}
      file={file}
      theme={theme}
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      {file ? (
        <Flex flexDirection="column" alignItems="center">
          <Box as={MdInsertDriveFile} mb={5} color="gray.500" />
          <Text textAlign="center" color="gray.500" uppercase={false}>
            {file.name}
          </Text>
        </Flex>
      ) : (
        <>
          {isDragActive ? (
            isDragAccept ? (
              <Text textAlign="center" color="gray.500">
                {acceptMessage}
              </Text>
            ) : (
              <Text textAlign="center" color="gray.500">
                {rejectMessage}
              </Text>
            )
          ) : (
            <>
              <Text textAlign="center" color="gray.500">
                {defaultMessage}
              </Text>
              <Text mt={5} textAlign="center" color="gray.500" fontSize="12px">
                Tamaño máximo: {maxSize / 1000000}MB
              </Text>
              <Text mt={1} textAlign="center" color="gray.500" fontSize="10px">
                (
                {accept
                  .split(", ")
                  .map((format) => extensionsTable[format])
                  .toString()
                  .replace(/,/g, ", ")}
                )
              </Text>
            </>
          )}
        </>
      )}
    </Container>
  );
};

Dropzone.defaultProps = {
  maxSize: 2000000,
  defaultMessage: "Arrastra tus archivos aquí, o haz click para seleccionar",
  rejectMessage: "Tipo de archivo no soportado",
  acceptMessage: "Suelta aquí",
  file: null,
  height: 200,
};

Dropzone.propTypes = {
  accept: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string,
  acceptMessage: PropTypes.string,
  rejectMessage: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  file: PropTypes.any,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Dropzone;
