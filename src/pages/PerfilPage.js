  import React, { useEffect, useState } from 'react';
  import { getPlaylistByAccount, accountsMock } from '../Services/AccountMock.js';
  import { Link } from 'react-router-dom';
  import logo from '../Imagens/netflix.png';
  import './PerfilPage.css';
import NavBar from '../Components/NavBar.js';
import Carrossel from '../Components/Carrossel.js';

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

    

    return (
      <div className="perfil-page">
        <NavBar/>

        <Carrossel listadeFilmes={playlist} descricao="Minha playlist"/>
        <Carrossel listadeFilmes={series} descricao="Minhas séries favoritas"/>
        <Carrossel listadeFilmes={filmes} descricao="Meus filmes"/>
       
      </div>
    );
  }
