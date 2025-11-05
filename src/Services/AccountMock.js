import { usuarios } from './UsuarioMock.js';
import FilmesServiceApi from '../Services/FilmesService.js';

let accountsMock = [];

export async function gerarAccountsMock() {
  if (accountsMock.length) return accountsMock; // evita recriar se já existe

  try {
    const filmes = await FilmesServiceApi.getAllFilmes();
    const totalFilmes = filmes.length;

    const gerarPlaylistAleatoria = (quantidade = 4) => {
      const playlist = new Set();
      while (playlist.size < quantidade) {
        const randomIndex = Math.floor(Math.random() * totalFilmes);
        playlist.add(filmes[randomIndex].id);
      }
      return Array.from(playlist);
    };

    accountsMock = usuarios.map((usuario, index) => ({
      id: index + 1,
      usuarioId: usuario.id,
      playlist: gerarPlaylistAleatoria(),
    }));

    return accountsMock;
  } catch (error) {
    console.error('Erro ao gerar accountsMock:', error);
    return [];
  }
}

// 👇 adiciona essa linha pra exportar também
export { accountsMock };
