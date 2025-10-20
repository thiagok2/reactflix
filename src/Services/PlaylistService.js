import { accountsMock } from './AccountMock.js';
import { filmes, filmes2, filmesNum } from './FilmesMock.js';


const todosFilmes = [...filmes, ...filmes2, ...filmesNum];

class PlaylistService {
  
  static getPlaylistByAccount(accountId, tipo = "default") {
    const account = accountsMock.find(acc => acc.id === accountId);
    if (!account) return [];

    const filmesDaConta = account.playlist
      .map(id => todosFilmes.find(f => f.id === id))
      .filter(Boolean);

    if (tipo === "series") {
      return filmesDaConta.filter(f => f.tipo === "s");
    }

    if (tipo === "filmes") {
      return filmesDaConta.filter(f => f.tipo === "f");
    }

    return filmesDaConta;
  }

  // Adicionar item à playlist
  static addToPlaylist(accountId, itemId) {
    const account = accountsMock.find(acc => acc.id === accountId);
    if (!account || account.playlist.includes(itemId)) return false;

    account.playlist.push(itemId);
    return true;
  }


  static removeFromPlaylist(accountId, itemId) {
    const account = accountsMock.find(acc => acc.id === accountId);
    if (!account) return false;

    account.playlist = account.playlist.filter(id => id !== itemId);
    return true;
  }
}

export default PlaylistService;
