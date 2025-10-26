import { filmes, filmes2, filmesNum } from "./FilmesMock.js";
import api from "./api";

class FilmesService {
    constructor() {
        this.todosFilmes = [...filmes, ...filmes2, ...filmesNum];
    }

    getById(id) {
        return this.todosFilmes.find((filme) => filme.id === id) || null;
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
        let filmesClicados = [];
        if (filmesClicadosStr) {
            filmesClicados = JSON.parse(filmesClicadosStr);
        }

        return filmesClicados;
    }

    // --- Integração inicial com TMDb ---
    // Transformador: converte objeto TMDb para o formato usado pela app (simplificado)
    _mapTmdbToApp(tmdb) {
        if (!tmdb) return null;
        const titulo = tmdb.title || tmdb.name || tmdb.original_title || tmdb.original_name;
        const poster = tmdb.poster_path || tmdb.backdrop_path || null;
        const ano = tmdb.release_date ? parseInt(tmdb.release_date.slice(0, 4)) : tmdb.first_air_date ? parseInt(tmdb.first_air_date.slice(0, 4)) : null;
        const tipo = tmdb.media_type === "tv" || tmdb.first_air_date ? "s" : "f";

        return {
            id: tmdb.id,
            titulo,
            fotoThumbnail: poster ? `https://image.tmdb.org/t/p/w500${poster}` : "",
            ano_lancamento: ano,
            tipo,
            duracao: tmdb.runtime ? `${tmdb.runtime}min` : null,
            nota_avaliacao: tmdb.vote_average || 0,
            numero_comentarios: tmdb.vote_count || 0,
            sinopse: tmdb.overview || "",
            // manter outros campos caso existam
            raw: tmdb
        };
    }

    // Buscar filmes populares do TMDb (fallback para mocks se falhar)
    async fetchPopular() {
        try {
            const res = await api.get("/movie/popular");
            if (res && res.data && Array.isArray(res.data.results)) {
                return res.data.results.map((r) => this._mapTmdbToApp(r));
            }
            return this.getFilmes();
        } catch (err) {
            console.error("Erro ao buscar populares do TMDb:", err.message || err);
            return this.getFilmes();
        }
    }

    // Buscar por id — tenta movie, depois tv como fallback
    async fetchById(id) {
        try {
            const resMovie = await api.get(`/movie/${id}`);
            if (resMovie && resMovie.data) {
                return this._mapTmdbToApp(resMovie.data);
            }
        } catch (errMovie) {
            // tentar TV
            try {
                const resTv = await api.get(`/tv/${id}`);
                if (resTv && resTv.data) {
                    return this._mapTmdbToApp(resTv.data);
                }
            } catch (errTv) {
                console.warn(`Não foi possível obter detalhes TMDb para id=${id}`);
            }
        }
        // fallback para mocks
        return this.getById(Number(id));
    }

        // Buscar por tipo: 'f' para filmes, 's' para séries
        async fetchByTipo(tipo, page = 1) {
            try {
                if (tipo === "s") {
                    const res = await api.get("/discover/tv", { params: { page } });
                    if (res && res.data && Array.isArray(res.data.results)) {
                        return res.data.results.map((r) => this._mapTmdbToApp(r));
                    }
                } else {
                    const res = await api.get("/discover/movie", { params: { page } });
                    if (res && res.data && Array.isArray(res.data.results)) {
                        return res.data.results.map((r) => this._mapTmdbToApp(r));
                    }
                }
                return this.getFilmesPorTipo(tipo);
            } catch (err) {
                console.error("Erro ao buscar por tipo no TMDb:", err.message || err);
                return this.getFilmesPorTipo(tipo);
            }
        }

    // Helper para montar URLs de imagem do TMDb
    getImageUrl(path, size = "w500") {
        if (!path) return "";
        return `https://image.tmdb.org/t/p/${size}${path}`;
    }
}

export default new FilmesService();
