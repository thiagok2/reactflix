import './UsuarioPage.css'
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
      <div className='container-do-algo'>
        <div className='header-usuario'>
          <img src={usuario.avatarImage} alt="avatar" width={150} />
          <div className='header-text'>
            <p className='nomeCompleto'>{usuario.nomeCompleto}</p>
            <p className='apelidoName'>{usuario.apelidoName}
            <p>{usuario.email}</p>
            </p>
            
          </div>
        </div>
        
        </div>
        {playlist && 
          <Carrossel listadeFilmes={playlist} descricao={`Filmes da playlist ${usuario?.apelidoName}`} expandido={true}/>
        }
        
      </div>

  );

}
