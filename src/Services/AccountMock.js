import { usuarios } from './UsuarioMock.js';
import { filmes, filmes2, filmesNum } from './FilmesMock.js';

// Mock de Accounts
export const accountsMock = [
  { id: 1, usuarioId: usuarios[0].id, playlist: [1, 3, 8, 20] },
  { id: 2, usuarioId: usuarios[1].id, playlist: [2, 5, 9, 22] },
  { id: 3, usuarioId: usuarios[2].id, playlist: [4, 6, 11, 17] },
  { id: 4, usuarioId: usuarios[3].id, playlist: [7, 10, 15, 21] },
  { id: 5, usuarioId: usuarios[4].id, playlist: [6, 13, 11, 16] },
  { id: 6, usuarioId: usuarios[5].id, playlist: [3, 2, 1, 20] },
  { id: 7, usuarioId: usuarios[6].id, playlist: [4, 10, 19, 21] },
  { id: 8, usuarioId: usuarios[7].id, playlist: [7, 10, 11, 21] },
  { id: 9, usuarioId: usuarios[8].id, playlist: [9, 2, 13, 12] },
  { id: 10, usuarioId: usuarios[9].id, playlist: [3, 2, 8, 7] },
];

// Função para pegar playlist de uma conta
export function getPlaylistByAccount(accountId) {
  const account = accountsMock.find(acc => acc.id === accountId);
  if (!account) return [];

  const todosFilmes = [...filmes, ...filmes2, ...filmesNum]; // junta todos os mocks

  return account.playlist
    .map(id => todosFilmes.find(f => f.id === id))
    .filter(filme => filme !== undefined); // filtra caso algum ID não exista
}
