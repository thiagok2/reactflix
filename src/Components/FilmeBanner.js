import './FilmeBanner.css'
import filme from '../Services/FilmesService';


function FilmeBanner ({filme}){

    return(
        <div className='Banner'>
            <img src={filme.imagem} class="BannerImg"/>
        </div>

    )

}

export default FilmeBanner