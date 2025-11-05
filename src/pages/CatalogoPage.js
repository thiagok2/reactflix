import './CatalogoPage.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import FilmesServiceApi from '../Services/MoviesServices';
import { FaComments, FaStar } from "react-icons/fa6";

function CatalogoPage() {
  const { tipo } = useParams();
  const [filmes, setFilmes] = useState([]);
  const isSeries = tipo === "series";

  useEffect(() => {
    const fetchData = async () => {
      const data = isSeries
        ? await FilmesServiceApi.getPopularSeries()
        : await FilmesServiceApi.getPopularMovies();


      const dataWithCast = await Promise.all(
        data.map(async (item) => {
          const elenco = isSeries
            ? await FilmesServiceApi.getSeriesCredits(item.id)
            : await FilmesServiceApi.getMovieCredits(item.id);
          return { ...item, elenco };
        })
      );

      setFilmes(dataWithCast);
    };

    fetchData();
  }, [isSeries]);

  const handleAddClicados = (filme) => {
    console.log("Clicou em:", filme.titulo);

  };

  return (
    <div className='container'>
      <div className='navbar'>
        <NavBar />
      </div>

      <div className='containers-catalogo'>
        {filmes.map((filme, idx) => (
          <div
            key={idx}
            className='container-filme'
            onClick={() => handleAddClicados(filme)}
          >
            <div className='header-filme'>
              <span className='filme-titulo'>{filme.titulo}</span>
              <span className="filme-comentarios">
                <FaComments /> {filme.curtidas}
              </span>
            </div>

            <div className='img-container'>
              <Link className='card-filmes' to={`/filme/${filme.id}`} >
                <img src={filme.fotoThumbnail} className='foto' alt={filme.titulo} />
              </Link>
            </div>

            <div className='filme-subtitulo'>
              <div className='subitem-header'>
                {filme.nota_avaliacao} <FaStar className='star' />
              </div>
              <div className='subitem-header faixa'>{filme.genero}</div>
            </div>

            <div className='introducao'>{filme.sinopse}</div>

            <div className='footer-filme'>
              <div className='footer-item'>Elenco: {filme.elenco}</div>
              <div className='footer-item'>Gênero: {filme.genero}</div>
              <div className='footer-item'>Lançamento: {filme.ano_lancamento}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoPage;
