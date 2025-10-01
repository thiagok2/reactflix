import "./HomePage.css";

import { Link } from 'react-router-dom'
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

    const clicados = filmeService.getClicados();

    return(
        <div className="tudo">

        <div className="tela" style={{ backgroundImage: `url(${filmeTopo.fotoThumbnail})` }}>
            
            <div className="casa">
                <NaveBar />
                <FilmeDestaque filme={filmeTopo}/>

                <div className="todosFilme">
                    <Carrossel listadeFilmes={filmes} descricao="Filmes novos"/>
                    <Carrossel listadeFilmes={series} descricao="Novidades nas séries" pExpandido={true}/>
                    
                    {
                        clicados?.length && <Carrossel listadeFilmes={clicados} descricao="Filmes do seu interesse"/>
                    }
                    
                    <CarroselNum listaNumerada ={filmesNum}/>

                </div>
            </div>
        
        </div>
        <div className="footer">
            <div className="cima">
            <span>
                Dúvidas? Entre em contato com: suportecine@gmail.com
            </span>
            </div>
            <div className="texto">
                <span className="link">
                    Sobre
                </span>
                <span className="link">
                    Conheça nossa equipe
                </span>

            </div>
        </div>
        </div>
    );
}

export default HomePage;