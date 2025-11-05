import { filmes, filmes2, filmesNum } from "./FilmesMock.js";

const API_KEY = "6570fc94237e7d374376204d4a47210f"; // 🔑 coloca tua chave TMDB aqui
const BASE_URL = "https://api.themoviedb.org/3";

class FilmesService {
  constructor() {
    this.todosFilmes = [...filmes, ...filmes2, ...filmesNum];
  }


  async getById(id) {

    const filmeLocal = this.todosFilmes.find((filme) => filme.id === id);
    if (filmeLocal) return filmeLocal;

    
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
      if (!response.ok) return null;
      const data = await response.json();

      
      
      return {
        id: data.id,
        titulo: data.title,
        descricao: data.overview,
        imagem: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        tipo: "f",
        nota: data.vote_average,
        ano: data.release_date ? data.release_date.split("-")[0] : "N/A",
      };
    } catch (error) {
      console.error("Erro ao buscar filme do TMDB:", error);
      return null;
    }
  }

  getRandomFilme() {
    const random = Math.floor(Math.random() * this.todosFilmes.length);
    return this.todosFilmes[random];
  }


  getFilmesPorTipo(tipo) {
    return this.todosFilmes.filter((f) => f.tipo === tipo);
  }


  getFilmes() {
    return this.todosFilmes.filter((f) => f.tipo === "f");
  }

  
  getSeries() {
    return this.todosFilmes.filter((f) => f.tipo === "s");
  }


  addFilmeClicado(filme) {
    const filmesClicadosStr = localStorage.getItem("filmesClicados");
    let filmesClicados = [];
    if (filmesClicadosStr) {
      filmesClicados = JSON.parse(filmesClicadosStr);
    }

    const jaClicado = filmesClicados.some((f) => f.id === filme.id);
    if (!jaClicado) {
      filmesClicados.push(filme);
      localStorage.setItem("filmesClicados", JSON.stringify(filmesClicados));
    }
  }

  getClicados() {
    const filmesClicadosStr = localStorage.getItem("filmesClicados");
    return filmesClicadosStr ? JSON.parse(filmesClicadosStr) : [];
  }
}

export default new FilmesService();
