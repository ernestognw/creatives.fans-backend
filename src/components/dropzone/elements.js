import styled from "styled-components";
import { Box } from "@chakra-ui/react";

const getColor = ({ theme, isDragAccept, isDragReject }) => {
  if (isDragAccept) {
    return theme.colors.yellow[500];
  }
  if (isDragReject) {
    return theme.colors.red[500];
  }
  return theme.colors.gray[500];
};

const Container = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: ${(props) => props.theme.colors.gray[50]};
  color: ${(props) => props.theme.colors.gray[400]};
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  height: ${(props) => props.height}px;
  justify-content: center;
  overflow: hidden;

  ${(props) =>
    props.file &&
    `
    background-color: ${props.theme.colors.gray[50]}
  `}
`;

export { Container };
