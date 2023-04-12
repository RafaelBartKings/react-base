import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from "react-icons/fa";

import { toast } from "react-toastify";
import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, ProfilePicture, NovoAluno } from "./styled";
import axios from "../../services/axios";

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/alunos");
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = event => {
    event.preventDefault();
    const exclamation = event.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    event.currentTarget.remove();
  }

  const handleDelete = async (event, id, index) => {
    event.persist();

    try {
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [ ...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);

    } catch (err) {
      const status = get(err, 'response.data.errors', []);

      if(status === 401) {
        toast.error('Você precisa fazer login.');
      } else {
        toast.error('Ocorreu um erro ao excluir o aluno')
      }

      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, "Fotos[0].url", false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={event => handleDelete(event, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
