import React from "react";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";

export default function Login() {

  return (
    <Container>
    <h1>Login</h1>
    </Container>
  );
}

// const dispatch = useDispatch();


// function handleClick(event)   {
//   event.preventDefault();

//   dispatch(exampleActions.clickButtonRequest());
// }

// <Title>
// Login
// <small>Rafa</small>
// </Title>
// <Paragrafo>Lorem Ipsum</Paragrafo>
// <button type="button" onClick={handleClick}>
// Enviar
// </button>