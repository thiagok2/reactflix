import "./HomePage.css";

import NaveBar from "../Components/NavBar";
import filmeService from "../Services/FilmesService";
import Carrossel from "../Components/Carrossel";
import CarroselNum from "../Components/CarroselNum";

import FilmeDestaque from "../Components/FilmeDestaque";

import {filmesNum} from '../Services/FilmesMock';
import { useEffect, useState } from "react";
import FilmesServiceApi from "../Services/FilmesServiceApi";

function HomePage(){

    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [seriesPopulares, setSeriesPopulares] = useState([]);
    const [filmesMaisVotados, setFilmesVotados] = useState([]);

    const [filmeDestaque, setFilmeDestaque] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const carregar = async () => {
            setCarregando(true);

            try{
                const [filmes, series, tops] = await Promise.all([
                    FilmesServiceApi.getPopularMovies(),
                    FilmesServiceApi.getPopularSeries(),
                    FilmesServiceApi.getTopRatedMovies()
                ]);

                setFilmesPopulares(filmes);
                setSeriesPopulares(series);
                setFilmesVotados(tops);
                
            } catch(error) {
                console.log(error);
            } finally {
                setCarregando(false);
            }
            
            
        }

        carregar();
        
    },[])


    const filmeTopo = filmeService.getRandomFilme();

    const clicados = filmeService.getClicados();

    if(carregando) {
        return <div class="container-carregando">Carregando...</div>
    }

    return(
        <div className="tela" style={{ backgroundImage: `url(${filmeTopo.fotoThumbnail})` }}>
            
            <div>
                <NaveBar />
                <FilmeDestaque filme={filmeTopo}/>

                <div className="todosFilme">
                    <Carrossel listadeFilmes={filmesPopulares} descricao="Filmes novos"/>
                    <Carrossel listadeFilmes={seriesPopulares} descricao="Novidades nas séries" pExpandido={true}/>
                    
                    {
                      clicados?.length && <Carrossel listadeFilmes={clicados} descricao="Filmes do seu interesse"/>
                    }
                    
                    <CarroselNum listaNumerada ={filmesMaisVotados}/>

                </div>
            </div>
        
        </div>
    );
}

export default HomePage;