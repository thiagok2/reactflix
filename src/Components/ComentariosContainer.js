import './ComentariosContainer.css'
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import FilmesServiceApi from '../Services/MoviesServices';

function ComentariosContainer({ filme }) {

  const [comentarios, setComentarios] = useState([]);
  const [tamanho, setTamanho] = useState(0);

  useEffect(() => {
    const carregarComentarios = async () => {
      
      const tipoConteudo = filme.tipo || 'movie';

      const data = await FilmesServiceApi.getCommentsByMovieId(filme.id, tipoConteudo);
      setComentarios(data);
      setTamanho(data.length);
    };

    carregarComentarios();
  }, [filme]);

  if (tamanho === 0) return null;

  return (
    <div className='all-container'>

      <div className='info-avaliacao'>
        <strong>Avaliação Média: </strong>
        <strong className='avaliação-texto'>
          <span>
            {filme.nota_avaliacao?.toFixed(1)} <FaStar className='estrela' /> / 10
          </span>
        </strong>

      </div>

      <div className="comentario-container">
        <strong className='avalicao'>Avaliações</strong>

        <div className='lista-comentarios'>
          {
            comentarios.map((comentario, idx) => (
              <div className='comentario' key={idx}>

                <Link to={`/usuario/${comentario.id}`} >
                  <div className="comentario-header">
                    <img src={comentario.avatar_foto || '/default-avatar.png'} className='foto-avatar-comentario' alt="foto-perfil" />
                    <strong>{comentario.autor}</strong>
                  </div>
                </Link>

                <p className="comentario-texto">{comentario.texto}</p>

                <div className='estrelas'>
                  <span className="comentario-data">{comentario.data_comentario}</span>
                </div>

              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
}

export default ComentariosContainer;
