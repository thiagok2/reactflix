import { useEffect, useState } from "react";
import "./PerfilPage.css";

import { gerarPlaylistAleatoria } from "../Services/UsuariosService";
import NavBar from "../Components/NavBar";
function PerfilPage() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    async function carregarPlaylist() {
      const data = await gerarPlaylistAleatoria(1, 8); // ID do usuário e qtd de filmes
      setPlaylist(data.filmes);
    }
    carregarPlaylist();
  }, []);

  return (
    <div>
      <div className="NavBar">
    <NavBar/>
        
        </div>

      <h1> Minha Playlist Aleatória</h1>

      <div className="filmes">

        {playlist.map((filme) => (
          <div  className="" key={filme.id} style={{ width: "150px" }}>
            <img className="img"
              src={filme.fotoThumbnail}
              alt={filme.titulo}
              
            />
            <p> {filme.descricao}</p>
            <p>{filme.titulo}</p>
          </div>

        ))}
      </div>
    </div>
  );
}

export default PerfilPage;
