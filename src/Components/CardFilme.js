import { Link } from "react-router-dom";

import "./CardFilme.css";
import filmesService from "../Services/FilmesService";
import { IoMdStar } from "react-icons/io";

function CardFilme({ filme, expandido = false }) {

    if (!filme) {
        return null;
    }

    const handleAddClicado = () => {
        filmesService.addFilmeClicado(filme);
    }

    return (
        <Link className="card" to={`/filme/${filme.id}`} onClick={handleAddClicado}
            style={{ backgroundImage: `url(${filme.fotoThumbnail})` }}>
           
            <div className="titulo-card-heard">{filme.titulo} <div className="nota-card-heard"> </div></div>

            {expandido && <span>{filme.duracao}</span>}
        
        </Link>
    );
}

export default CardFilme;