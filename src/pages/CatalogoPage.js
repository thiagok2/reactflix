import './CatalogoPage.css'
import cabana from '../Imagens/cabana.jpg'

import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom'
import filmesService from '../Services/FilmesService';

function CatalogoPage() {

    const {tipo} = useParams();
    let paramTipo = tipo == "series" ? "s":"f";

    console.log(tipo);

    const filmes = filmesService.getFilmesPorTipo(paramTipo);

    console.log(filmes);

    return (
        <div className='paicatalogo'>
            <div className='navbar'>
                <NavBar />
            </div>

            <div className='containers-catalogo'>
                {
                    filmes.map((filme, idx) => (
                        <div key={idx}>
                            <div className='img-container'>
                                <img src={filme.fotoThumbnail} className='foto' alt="A Cabana" />
                            </div>
                            <div className='introducao'>
                                Descrição: {filme.sinopse}
                            </div>
                            <div className='diretor-escritor'>
                                <div className='diretor'> Diretor: {filme.elenco}</div>
                                <div className='escritor'> Gênero: {filme.genero}</div>
                            </div>
                        </div>
                    ))
                    
                }
                
            </div>
            
        </div>
    )
}

export default CatalogoPage;
