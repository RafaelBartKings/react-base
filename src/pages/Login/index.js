import React from "react";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { Title, Paragrafo } from "./styled";

export default function Login() {
  const dispatch = useDispatch();


  function handleClick(event)   {
    event.preventDefault();

    dispatch({
      type: 'BOTAO_CLICADO',
    });
  }

  return (
    <Container>
      <Title>
        Login
        <small>Rafa</small>
      </Title>
      <Paragrafo>Lorem Ipsum</Paragrafo>
      <button type="button" onClick={handleClick}>Enviar</button>
    </Container>
  );
}
