import "./CardPerfil.css";
import { Link } from "react-router-dom";
import { CgPlayButtonO } from "react-icons/cg";

const CardPerfil = ({ usuario }) => {
  const handleClick = () => {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  };

  return (
    <Link to="/home" className="Perfil" onClick={handleClick}>
      <div className="containerFoto">
       
        <CgPlayButtonO size={40} color="#f3e6bdff" className="iconePlay" />
      </div>

      <span className="NomePerfil">{usuario.apelidoName}</span>
    </Link>
  );
};

export default CardPerfil;
