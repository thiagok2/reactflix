// playlistService.js
import { accountsMock } from "../mocks/AccountsMock.js";
import { filmesMock } from "../mocks/FilmesMock.js";

export function getPlaylistByAccount(accountId) {
  const account = accountsMock.find(acc => acc.id === accountId);
  if (!account) return [];

  return account.playlist.map(filmeId =>
    filmesMock.find(filme => filme.id === filmeId)
  );
}
