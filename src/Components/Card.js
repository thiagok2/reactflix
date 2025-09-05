import "./Card.css";
import {Link} from 'react-router-dom'

function CardPerfil ({usuario}){

    return(

        <Link to="/home"className="Perfil">

            <img src={usuario.foto} className="fotoPerfil"></img>

            <span className='NomePerfil'>
                {usuario.nome}
            </span>

        </Link>

    );

}

export default CardPerfil;