import './CatalogoPage.css'

import NavBar from '../Components/NavBar';
import { Link, useParams } from 'react-router-dom'
import filmesService from '../Services/FilmesService';

function CatalogoPage() {

    const {tipo} = useParams();
    let paramTipo = tipo === "series" ? "s":"f";

    console.log(tipo);

    const filmeList = filmesService.getFilmesPorTipo(paramTipo);

    console.log(filmeList);

    return (
        <div className='paicatalogo'>
            <div className='navbar'>
                <NavBar />
            </div>

            <div className='containers-catalogo'>
                {
                    filmeList.map((filme, idx) => 
                        <Link key={idx} className='container-filme'>
                            <h3 className='titulo-catalogo'>{filme.titulo}</h3>
                            <div className='img-container'>
                                <Link className='card-filmes' to={`/filme/${filme.id}`} > 
                                
                                    <img src={filme.fotoThumbnail} className='foto' alt={filme.titulo} />
                            
                                </Link>
                                         <div className='idade-catalogo'>{filme.faixa_etaria} </div>
                            </div>

                            
                            <div className='introducao'>
                                Descrição: {filme.sinopse}
                            </div>
                            <div className='diretor-escritor'>
                                <div className='diretor'> {filme.elenco}</div>
                                <div className='escritor'> {filme.genero}</div>
                            </div>
                        </Link>
                    )
                }
                
            </div>
            
        </div>
    )
}

export default CatalogoPage;
