  import React, { useEffect, useState } from 'react';
  import { getPlaylistByAccount, accountsMock } from '../Services/AccountMock.js';
  import { Link } from 'react-router-dom';
  import logo from '../Imagens/netflix.png';
  import './PerfilPage.css';

  export default function PerfilPage() {
    const [usuario, setUsuario] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [series, setSeries] = useState([]);
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      if (usuarioLogado) {
        setUsuario(usuarioLogado);
        const account = accountsMock.find(acc => acc.usuarioId === usuarioLogado.id);
        if (account) {
          setPlaylist(getPlaylistByAccount(account.id));
          setSeries(getPlaylistByAccount(account.id, "series"));
          setFilmes(getPlaylistByAccount(account.id, "filmes"));
        }
      }
      setLoading(false);
    }, []);

    if (!usuario) return <p>Carregando usuário...</p>;

    const renderCarousel = (titulo, lista) => (
      <div style={{ marginTop: '30px' }}>
        <h3>
          {loading && <span className="loader"></span>}
          {titulo}
        </h3>
        <div className="carousel">
          {lista.length > 0 ? (
            lista.map(filme => (
              <Link key={filme.id} to={`/filme/${filme.id}`}>
                <div className="filme-card">
                  <img
                    src={filme.fotoThumbnail.startsWith('/') ? filme.fotoThumbnail : `/${filme.fotoThumbnail}`}
                    alt={filme.titulo}
                    className="filme-img"
                  />
                  <div className="filme-titulo">{filme.titulo}</div>
                </div>
              </Link>
            ))
          ) : (
            <p>Sem itens aqui.</p>
          )}
        </div>
      </div>
    );

    return (
      <div className="perfil-page">
        <div className='parte-superior'> 
          <img src={logo} alt="Logo"/>
          <div className="nav-bar-conta">
            <img src={usuario.avatarImage} alt={usuario.apelidoName} className="foto-conta" />
            <Link to="/home" className="linkconta">{usuario.apelidoName}</Link>
          </div>
        </div>

        <div className="user-info">
          <img src={usuario.fotoPerfil} alt={usuario.nome} />
          <h2>{usuario.nome}</h2>
        </div>

        {renderCarousel("Minha Playlist", playlist)}
        {renderCarousel("Séries favoritas", series)}
        {renderCarousel("Filmes favoritos", filmes)}
      </div>
    );
  }
