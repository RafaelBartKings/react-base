import React from "react";

import { Container } from "../../styles/GlobalStyles";
import { Title, Paragrafo } from "./styled";

export default function Login() {
  return (
    <Container>
      <Title>
        Login
        <small>Rafa</small>
      </Title>
      <Paragrafo>Lorem Ipsum</Paragrafo>
      <button type="button">Enviar</button>
    </Container>
  );
}
