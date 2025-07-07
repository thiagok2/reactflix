import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import filmesService from '../services/FilmesService';

const FilmesListPage = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const lista = filmesService.getFilmes();
    setFilmes(lista);
  }, []);

  return (
   <div className="container mt-5">
      <h1>Filmes</h1>
      <ul className="list-group">
        {filmes.map(filme => (
          <li key={filme.id} className="list-group-item d-flex justify-content-between">
            <Link to={`/filmes/${filme.id}`}>{filme.titulo}</Link>
            <span>{filme.ano_lancamento} - {filme.genero}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmesListPage;