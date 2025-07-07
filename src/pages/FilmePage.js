import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import filmesService from '../services/FilmesService';

const FilmePage = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const filmeParam = filmesService.getFilmeById(id);
    setFilme(filmeParam);
  },[id]);

    if (!filme) 
        return (
          <p className="container mt-5">Filme não encontrado.</p>
        );

  return (
    <div className="container mt-5">
      <h1>{filme.titulo}</h1>
      <p><strong>Gênero:</strong> {filme.genero}</p>
      <p><strong>Duração:</strong> {filme.duracao} min</p>
      <p><strong>Ano:</strong> {filme.ano_lancamento}</p>
      <p><strong>Avaliação:</strong> {filme.nota_avaliacao}</p>

      <hr />

    </div>
  );
}

export default FilmePage;