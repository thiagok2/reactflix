import "./TelaInicial.css";
import cineversoBg from "../Imagens/ofcc.png";

function TelaInicial() {
  const usuarioExemplo = {
 
  };
  return (
    <div className="tela-inicial" style={{ "--logo-url": `url(${cineversoBg})` }}>
      <h2></h2>

      <div className="janelas">
        <CardPerfil key={usuarioExemplo.id} usuario={usuarioExemplo} />
      </div>


    </div>
  );
}
//testee
export default TelaInicial;