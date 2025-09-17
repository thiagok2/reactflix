import { Link } from "react-router-dom";
import "./CardFilme.css";
import filmesService from "../Services/FilmesService";

function CardFilme ({filme}) {
    const handleAddClicados = () => {
        filmesService.addFilmeClicado(filme);
    }

    return (
        <Link to={`/filme/${filme.id}`} onClick={handleAddClicados}>
            <img src={filme.fotoThumbnail} className="fotofilme" title={filme.descricao}></img>
        </Link>
    )
}

export default CardFilme;