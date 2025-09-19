import React, { useState, useEffect } from "react";
import { getPlaylistByAccount } from "../Services/PlaylistService.js";

export default function Playlist({ accountId }) {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const data = getPlaylistByAccount(accountId);
    setPlaylist(data);
  }, [accountId]);

  return (
    <div>
      <h2>Playlist do Usuário</h2>
      <ul>
        {playlist.map(filme => (
          <li key={filme.id}>{filme.titulo}</li>
        ))}
      </ul>
    </div>
  );
}
