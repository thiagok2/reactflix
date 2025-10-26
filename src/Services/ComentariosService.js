import { comentarios as comentariosMock } from "./ComentariosMock.js";

const STORAGE_KEY = "comentarios_local";

class ComentarioService {
  // retorna comentários combinando mocks + localStorage
  getByFilmeId(idFilme) {
    const localStr = localStorage.getItem(STORAGE_KEY);
    let local = [];
    if (localStr) {
      try {
        local = JSON.parse(localStr);
      } catch (e) {
        local = [];
      }
    }

    const merged = [
      ...comentariosMock.filter((c) => c.idFilme === idFilme),
      ...local.filter((c) => c.idFilme === idFilme),
    ];

    // ordenar por data (mais recente primeiro)
    merged.sort((a, b) => (b.data_comentario || "").localeCompare(a.data_comentario || ""));
    return merged;
  }

  // Async wrapper to support future API calls without changing callers
  async fetchByFilmeId(idFilme) {
    return Promise.resolve(this.getByFilmeId(idFilme));
  }

  // Adiciona comentário no armazenamento local (simula POST para uma API)
  async addComment({ idFilme, autor, texto, avaliacao, avatar_foto = null }) {
    const localStr = localStorage.getItem(STORAGE_KEY);
    let local = [];
    if (localStr) {
      try {
        local = JSON.parse(localStr);
      } catch (e) {
        local = [];
      }
    }

    const data_comentario = new Date().toISOString().slice(0, 10);
    const novo = {
      idFilme,
      autor,
      texto,
      avaliacao: Number(avaliacao) || 0,
      avatar_foto,
      data_comentario,
    };

    local.push(novo);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(local));
    } catch (e) {
      console.error("Não foi possível salvar comentário no localStorage", e);
    }

    // retornar lista atualizada
    return this.getByFilmeId(idFilme);
  }
}

const instance = new ComentarioService();
export default instance;
