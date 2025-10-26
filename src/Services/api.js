// src/Services/api.js
import axios from "axios";

// Preferência: ler chave da variável de ambiente REACT_APP_TMDB_API_KEY
// Crie um arquivo .env.local com a linha: REACT_APP_TMDB_API_KEY=sua_chave_aqui
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
if (!apiKey) {
  // Aviso em tempo de execução — keep fallback for quick dev but recommend .env
  // REMOVA qualquer chave sensível antes de commitar ao repositório.
  // Nota: há um fallback legado para permitir que o projeto rode sem config,
  // mas é recomendado preencher a variável de ambiente.
  // console.warn("REACT_APP_TMDB_API_KEY não encontrada. Usando fallback (não recomendado).");
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey || "f7d34a1e26b7443d49ac04583652ea16",
    language: "pt-BR"
  }
});

export default api;