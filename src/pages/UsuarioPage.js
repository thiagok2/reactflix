import './UsuarioPage'
import React, { useEffect, useState } from 'react';
import PlaylistService from '../Services/PlaylistService.js';
import { accountsMock } from '../Services/AccountMock.js';
import NavBar from '../Components/NavBar.js';
import { useParams } from 'react-router-dom';
import Carrossel from '../Components/Carrossel.js';
import UsuariosService from '../Services/UsuariosService.js'

export default function UsuarioPage({ comentarios }) {

  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

   const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const u = UsuariosService.getByID(Number(id));
    setUsuario(u);

    if(u){
      setPlaylist(PlaylistService.getPlaylistByAccount(u.id));
    }
      
  }, [id]);

  if(!usuario) return <p>Carregando usuário...</p>;

  return (
 
    <div className="perfil-page">
      <NavBar/>

      <div className='header-usuario'>
        <h2>Perfil do Usuário</h2>
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Nome:</strong> {usuario.nomeCompleto}</p>
        <p><strong>Apelido:</strong> {usuario.apelidoName}</p>
        <img src={usuario.avatarImage} alt="avatar" width={150} />
      </div>
      {playlist && 
        <Carrossel listadeFilmes={playlist} descricao={`Filmes da playlist ${usuario?.apelidoName}`} expandido={true}/>
      }
      
    </div>

  );

}
