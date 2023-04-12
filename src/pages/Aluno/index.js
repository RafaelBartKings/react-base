import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { isEmail, isInt, isFloat } from "validator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import axios from "../../services/axios";
import history from "../../services/history";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";
import * as actions from "../../store/modules/auth/actions";

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', 0);
  const [ nome, setNome ] = useState('');
  const [ sobrenome, setSobrenome ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ idade, setIdade ] = useState('');
  const [ peso, setPeso ] = useState('');
  const [ altura, setAltura ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    if(!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Photo = get(data, 'Photos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if(status === 400) errors.map(error => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres.')
      formErrors = true;
    }

    if (sobrenome.length < 3 || nome.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres.')
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido')
      formErrors = true;
    }

    if (!isInt(idade)) {
      toast.error('Idade inválida')
      formErrors = true;
    }

    if (!isInt(peso)) {
      toast.error('Peso inválida')
      formErrors = true;
    }

    if (!isInt(altura)) {
      toast.error('Altura inválida')
      formErrors = true;
    }

    if(formErrors) return;

    try {
      setIsLoading(true);

      if(id) {
        //Editando
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        // criando
        const {data} = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (error) {
      const status = get(error, `response.status`, 0);
      const data = get(error, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map(error => toast.error(error));
      } else {
        toast.error('Erro desconhecido!')
      }

      if(status === 401) dispatch(actions.registerFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Novo Aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={event => setNome(event.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={event => setSobrenome(event.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="idade"
          value={idade}
          onChange={event => setIdade(event.target.value)}
          placeholder="Idade"
        />
        <input
          type="peso"
          value={peso}
          onChange={event => setPeso(event.target.value)}
          placeholder="Peso"
        />
        <input
          type="altura"
          value={altura}
          onChange={event => setAltura(event.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>

    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

