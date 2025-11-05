import "./SelecaoPerfil.css";
import CardPerfil from "./CardPerfil";
import cineversoBg from "../Imagens/ofcc.png";
import clicar from "../Imagens/clicar.png"

function SelecaoPerfil() {
  const usuarioExemplo = {

  };

  return (
     <div 
      className="selecao-perfil" 
      style={{ backgroundImage: `url(${cineversoBg})`  }} // Aplica a imagem de fundo diretamente
    >
      <h2></h2>
      
      <div className="janelas">
        <CardPerfil key={usuarioExemplo.id} usuario={usuarioExemplo} foto={clicar} />
      </div>


    </div>

    
  );
}

export default SelecaoPerfil;
