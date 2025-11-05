import "./FilmePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Banner from "../Components/FilmeBanner";
import Header from "../Components/FilmeHeader";
import ComentariosContainer from "../Components/ComentariosContainer";
import Carrossel from "../Components/Carrossel";
import NotFound from "./NotFound";
import NavBar from "../Components/NavBar";

import FilmesServiceApi from "../Services/MoviesServices";

const API_KEY = "44328d1f5cdd912e2cb1e11394883668";
const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function FilmePage() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarFilme = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Tenta buscar como filme
        let data = null;
        let tipo = "movie";

        const movieResponse = await fetch(
          `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
        );

        if (movieResponse.ok) {
          data = await movieResponse.json();
        } else {
          // 2️⃣ Se não achar, tenta como série
          const tvResponse = await fetch(
            `${API_BASE_URL}/tv/${id}?api_key=${API_KEY}&language=pt-BR`
          );
          if (!tvResponse.ok) throw new Error("Filme/Série não encontrado");
          data = await tvResponse.json();
          tipo = "series";
        }

        // 3️⃣ Busca elenco
        const elenco =
          tipo === "series"
            ? await FilmesServiceApi.getSeriesCredits(id)
            : await FilmesServiceApi.getMovieCredits(id);

        // 4️⃣ Mapeia dados principais
        const mapped = {
          id: data.id,
          titulo: data.title || data.name,
          sinopse: data.overview,
          fotoThumbnail: data.poster_path
            ? `${IMAGE_BASE_URL}${data.poster_path}`
            : null,
          nota_avaliacao: data.vote_average,
          ano_lancamento: data.release_date || data.first_air_date,
          genero: Array.isArray(data.genres)
            ? data.genres.map((g) => g.name).join(", ")
            : "",
          elenco,
          tipo,
        };

        setFilme(mapped);

        // 5️⃣ Busca relacionados (recomendações da TMDb)
        const recResponse = await fetch(
          `${API_BASE_URL}/${tipo}/${id}/recommendations?api_key=${API_KEY}&language=pt-BR`
        );

        if (recResponse.ok) {
          const recData = await recResponse.json();
          const recMapped = recData.results
            .filter((r) => r.poster_path)
            .slice(0, 10)
            .map((r) => ({
              id: r.id,
              titulo: r.title || r.name,
              fotoThumbnail: `${IMAGE_BASE_URL}${r.poster_path}`,
              nota_avaliacao: r.vote_average,
              sinopse: r.overview,
              ano_lancamento: r.release_date || r.first_air_date,
              tipo,
            }));
          setRelacionados(recMapped);
        } else {
          setRelacionados([]);
        }
      } catch (err) {
        console.error(err);
        setError("Filme não encontrado");
      } finally {
        setLoading(false);
      }
    };

    carregarFilme();
  }, [id]);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error || !filme) return <NotFound />;

  return (
    <div className="Filme">
      <div className="Navbar">
        <NavBar />
      </div>

      <div className="PaidetodosFilme">
        <div className="divFilmeBanner">
          <Banner filme={filme} />
        </div>

        <div className="infos">
          <Header filme={filme} />
        </div>
      </div>

      <div className="container-comentarios">
        <ComentariosContainer filme={filme} />
      </div>

      {/* 🔥 Agora os relacionados vêm da TMDb */}
      {relacionados.length > 0 && (
        <div className="container-relacionados">
          <Carrossel
            listadeFilmes={relacionados}
            descricao="Relacionados"
          />
        </div>
      )}
    </div>
  );
}

export default FilmePage;
