import { Img } from "@chakra-ui/react";
import styled from "styled-components";

const Logo = styled.img`
  height: 32px;
`;

const Icon = styled(Img)`
  border-radius: 99999px;
  object-fit: cover;
  width: 1.5rem;
`;

export { Icon, Logo };
