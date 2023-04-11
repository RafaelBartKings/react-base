import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from '../../components/Loading';
import * as actions from "../../store/modules/auth/actions";


export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector(state => state.auth.id);
  const nomeStorage = useSelector(state => state.auth.nome);
  const emailStorage = useSelector(state => state.auth.email);
  const isLoading = useSelector(state => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if(!id) return;

    setNome(nomeStorage);
    setEmail(emailStorage);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));

  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar Dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label hmtlfor="nome">
          Nome:
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome"/>
        </label>

        <label hmtlfor="email">
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
        </label>

        <label hmtlfor="senha">
          Senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha"/>
        </label>

        <button type="submit">Salvar</button>

      </Form>
    </Container>
  );
}
