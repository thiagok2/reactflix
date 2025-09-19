import React, { useEffect, useState } from 'react';
import { getPlaylistByAccount } from '../Services/AccountMock.js';
import { usuarios } from '../Services/UsuarioMock.js';
import { accountsMock } from '../Services/AccountMock.js';
import { Link } from 'react-router-dom';

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    // Pega o usuário logado do localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
      setUsuario(usuarioLogado);

      // Busca a conta desse usuário
      const account = accountsMock.find(acc => acc.usuarioId === usuarioLogado.id);
      if (account) {
        setPlaylist(getPlaylistByAccount(account.id));
      }
    }
  }, []);

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div className="perfil-page">

      {/* Cabeçalho com avatar e apelido */}
      <div className="nav-bar-conta">
        <img src={usuario.avatarImage} alt={usuario.apelidoName} className="foto-conta" />
        <Link to="/config" className="linkconta">
          <span>{usuario.apelidoName}</span>
        </Link>
      </div>

      {/* Informações do usuário */}
      <h2>{usuario.nome}</h2>
      <img
        src={usuario.fotoPerfil}
        alt={usuario.nome}
        style={{ width: '100px', borderRadius: '50%' }}
      />

      {/* Playlist do usuário */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {playlist.map(filme => (
          <div key={filme.id}>
            <img
              src={filme.fotoThumbnail}
              alt={filme.titulo}
              style={{ width: '120px' }}
            />
            <p>{filme.titulo}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
