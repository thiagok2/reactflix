
import api from "./api";

// Filmes populares
export const getPopularMovies = async () => {
  const response = await api.get("/movie/popular");
  return response.data.results;
};

// Filmes em cartaz
export const getNowPlayingMovies = async () => {
  const response = await api.get("/movie/now_playing");
  return response.data.results;
};

// Filmes mais bem avaliados
export const getTopRatedMovies = async () => {
  const response = await api.get("/movie/top_rated");
  return response.data.results;
};

// Detalhes de um filme específico
export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};
