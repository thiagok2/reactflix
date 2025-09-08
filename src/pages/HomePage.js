import "./HomePage.css";

import NaveBar from "../Components/NavBar";
import filmeService from "../Services/FilmesService";
import Carrossel from "../Components/Carrossel";
import CarroselNum from "../Components/CarroselNum";
import FilmeDestaque from "../Components/FilmeDestaque";

import {filmesNum} from '../Services/FilmesMock';

function HomePage(){
    
    const filmeTopo = filmeService.getRandomFilme();

    const series = filmeService.getSeries();
    const filmes = filmeService.getFilmes();

    return(
        <div className="tela" style={{ backgroundImage: `url(${filmeTopo.fotoThumbnail})` }}>
            
            <div className="casa">
                <NaveBar />
                <FilmeDestaque filme={filmeTopo}/>

                <div className="todosFilme">
                    <Carrossel listadeFilmes={filmes} descricao="Filmes novos"/>
                    <Carrossel listadeFilmes={series} descricao="Novidades nas séries"/>
                    <CarroselNum listaNumerada ={filmesNum}/>

                </div>
            </div>
        
        </div>
    );
}

export default HomePage;