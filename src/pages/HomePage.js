import "./HomePage.css";
import { useEffect, useState } from "react";

import NavBar from "../Components/NavBar";
import Carrossel from "../Components/Carrossel";
import CarroselNum from "../Components/CarroselNum";
import FilmeDestaque from "../Components/FilmeDestaque";

import FilmesServiceApi from "../Services/MoviesServices";
import { filmesNum } from "../Services/FilmesMock"; 

function HomePage() {
  const [filmes, setFilmes] = useState([]);
  const [series, setSeries] = useState([]);
  const [filmeTopo, setFilmeTopo] = useState(null);
  const [clicados, setClicados] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Pré-carrega os gêneros (opcional)
        await FilmesServiceApi.preloadGenres();

        const [filmesPopulares, seriesPopulares] = await Promise.all([
          FilmesServiceApi.getPopularMovies(),
          FilmesServiceApi.getPopularSeries(),
        ]);

        setFilmes(filmesPopulares);
        setSeries(seriesPopulares);

        // Escolhe um filme aleatório para destaque
        const aleatorio = filmesPopulares[Math.floor(Math.random() * filmesPopulares.length)];
        setFilmeTopo(aleatorio);

        // Recupera filmes clicados do localStorage (se você quiser manter essa feature)
        const armazenados = JSON.parse(localStorage.getItem("filmesClicados") || "[]");
        setClicados(armazenados);
      } catch (error) {
        console.error("Erro ao carregar dados da HomePage:", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div
      className="tela"
      style={{
        backgroundImage: filmeTopo ? `url(${filmeTopo.fotoThumbnail})` : "none",
      }}
    >
      <div>
        <NavBar />

        {filmeTopo && <FilmeDestaque filme={filmeTopo} />}

        <div className="todosFilme">
          {filmes.length > 0 && (
            <Carrossel listadeFilmes={filmes} descricao="Filmes populares" />
          )}

          {series.length > 0 && (
            <Carrossel listadeFilmes={series} descricao="Séries populares" pExpandido={true} />
          )}

          {clicados.length > 0 && (
            <Carrossel listadeFilmes={clicados} descricao="Filmes do seu interesse" />
          )}

          <CarroselNum listaNumerada={filmesNum} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
