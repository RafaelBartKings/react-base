import React from "react";
import { get } from "lodash";
import { toast } from "react-toastify";
import Proptypes from "prop-types";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Title, Form } from "../Aluno/styled";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Photo({ match }) {
  const dispatch = userDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = React.useState();
  const [photo, setPhoto] = React.useState();

  React.useEffect(() => {
  const getData = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.get(`/alunos/${id}`);
      setPhoto(data, 'Photos[0].url', '')
    } catch (err) {
      toast.error('Erro ao obter imagem');
      setIsLoading(false)
      history.push('/');
    }
  }
  getData();
  }, []);

  const handleChange = async event => {
    const file = event.target.files[0];
    const photoUrl = URL.createObjectURL(file);

    setPhoto(photoUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('photo', file);

    try {
      setIsLoading(true);

      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao envira foto');

      if(status === 401) dispach(actions.loginFailure())
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} /> : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange}/>
        </label>
      </Form>
    </Container>
  );
}

Photo.Proptypes = {
  match: Proptypes.shape({}).isRequired,
}