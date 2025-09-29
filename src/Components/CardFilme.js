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
    
    <div className="card-container">

    
        <>
        <Link className="card" to={`/filme/${filme.id}`} onClick={handleAddClicado}
            style={{ backgroundImage: `url(${filme.fotoThumbnail})` }}>
            <div className="card-heard">{filme.faixa_etaria}</div>
<<<<<<< HEAD
            <div className="titulo-card-heard">{filme.titulo} 
                <div className="nota-card-heard">
                    <IoMdStar />{filme.nota_avaliacao} 
                </div>
            </div>
=======
            <div className="titulo-card-heard">{filme.titulo} <div className="nota-card-heard"><IoMdStar />{filme.nota_avaliacao} </div></div>

            {expandido && <span>{filme.duracao}</span>}
        
>>>>>>> 3718fb15452502a85b39687c01d24da873e86ea0
        </Link>
        {expandido && <div className="card-footer">
                 <span className="genero">Gênero: {filme.genero}</span>
            
            </div>  
        }
        
        </>

    </div>
    );
}

export default CardFilme;