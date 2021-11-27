import styled from "styled-components";
import { Box } from "@chakra-ui/react";

const ThumbContainer = styled.div`
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  align-items: center;
`;

const FlipButton = styled(Box)`
  padding: 3px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: ${(props) => props.mr || 0}px;

  ${(props) => props.rotate && `transform: rotate(90deg)`}
`;

export { ThumbContainer, FlipButton };
