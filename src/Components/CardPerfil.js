import "./CardPerfil.css";
import {Link} from 'react-router-dom'

const CardPerfil = ({ usuario }) => {

    const handleClick = () => {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }

    return(

        <Link to="/home"className="Perfil" onClick={handleClick}>

            <img src={usuario.avatarImage} className="fotoPerfil"></img>

            <span className='NomePerfil'>
                
                {usuario.apelidoName}
            </span>

        </Link>

    );

}

export default CardPerfil;