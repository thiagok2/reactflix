const API_KEY = '44328d1f5cdd912e2cb1e11394883668';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

const fetchTMDb = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  const sp = url.searchParams;
  sp.set('api_key', API_KEY);
  sp.set('language', 'pt-BR');
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) sp.set(k, String(v));
  });

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`Erro na API do TMDb: ${response.status}`);
  return response.json();
};

// ---------- Cache de gêneros ----------
const GenreCache = (() => {
  const memory = { movie: null, tv: null };
  const pending = { movie: null, tv: null };

  const fetchGenres = async (type) => {
    const endpoint = type === 'tv' ? '/genre/tv/list' : '/genre/movie/list';
    const data = await fetchTMDb(endpoint);
    return Array.isArray(data?.genres) ? data.genres : [];
  };

  const get = async (type) => {
    if (Array.isArray(memory[type]) && memory[type].length > 0) {
      return memory[type];
    }
    if (pending[type]) return pending[type];

    pending[type] = (async () => {
      try {
        const genres = await fetchGenres(type);
        memory[type] = genres;
        return genres;
      } finally {
        pending[type] = null;
      }
    })();

    return pending[type];
  };

  const preloadBoth = async () => {
    await Promise.all([get('movie'), get('tv')]);
  };

  return { get, preloadBoth };
})();

// ---------- helpers ----------
const getGenreNamesByIds = (genreIds, allGenres) => {
  if (!Array.isArray(genreIds) || !Array.isArray(allGenres) || allGenres.length === 0) return '';
  const byId = new Map(allGenres.map((g) => [g.id, g.name]));
  return genreIds.map((id) => byId.get(id)).filter(Boolean).join(', ');
};

const mapMovieData = (movie, genres, typeMovie = 'movie') => ({
  id: movie.id,
  titulo: movie.title,
  fotoThumbnail: movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null,
  ano_lancamento: typeMovie == 'movie' ? movie.release_date : 'tv',
  tipo: typeMovie,
  sinopse: movie.overview,
  genero: getGenreNamesByIds(movie.genre_ids, genres),
  elenco: '',
  curtidas: movie.vote_count,
  nota_avaliacao: movie.vote_average,
});

const mapCommentData = (comment) => {
  let avatar = comment.author_details?.avatar_path;

  if (avatar) {
    if (avatar.startsWith('/')) {
      avatar = `https://image.tmdb.org/t/p/w200${avatar}`;
    }
  } else {
    avatar = '/default-avatar.png'; 
  }

  return {
    id: comment.id,
    avatar_foto: avatar,
    autor: comment.author,
    texto: comment.content,
    data_comentario: comment.created_at,
  };
};



const FilmesServiceApi = {
  preloadGenres: async () => GenreCache.preloadBoth(),

  getPopularMovies: async () => {
    try {
      const genres = await GenreCache.get('movie');
      const data = await fetchTMDb('/movie/popular');
      return data.results.map((f) => mapMovieData(f, genres));
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      return [];
    }
  },

  getPopularSeries: async () => {
    try {
      const genres = await GenreCache.get('tv');
      const data = await fetchTMDb('/tv/popular');
      return data.results.map((s) => mapMovieData(s, genres, 'tv'));
    } catch (error) {
      console.error('Erro ao buscar séries populares:', error);
      return [];
    }
  },

  getTopRatedMovies: async () => {
    try {
      const genres = await GenreCache.get('movie');
      const data = await fetchTMDb('/movie/top_rated');
      return data.results.map((f) => mapMovieData(f, genres));
    } catch (error) {
      console.error('Erro ao buscar filmes mais votados:', error);
      return [];
    }
  },

  getMovieCredits: async (movieId) => {
    try {
      const data = await fetchTMDb(`/movie/${movieId}/credits`);
      return data.cast.slice(0, 5).map((a) => a.name).join(', ');
    } catch (error) {
      console.error(`Erro ao buscar elenco do filme ${movieId}:`, error);
      return 'Elenco não disponível';
    }
  },

  getSeriesCredits: async (seriesId) => {
    try {
      const data = await fetchTMDb(`/tv/${seriesId}/credits`);
      return data.cast.slice(0, 5).map((a) => a.name).join(', ');
    } catch (error) {
      console.error(`Erro ao buscar elenco da série ${seriesId}:`, error);
      return 'Elenco não disponível';
    }
  },

  getCommentsByMovieId: async (movieId, tipo) => {
    try {
      
      const endpointTipo = tipo === 'tv' ? 'tv' : 'movie';
  
      const data = await fetchTMDb(`/${endpointTipo}/${movieId}/reviews`);
      return data.results?.map((c) => mapCommentData(c)) || [];
    } catch (error) {
      console.error(`Erro ao buscar comentários do ${movieId}:`, error);
      return [];
    }
  },
  



};
 
export default FilmesServiceApi;
