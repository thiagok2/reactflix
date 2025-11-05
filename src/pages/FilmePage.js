import "./FilmePage.css";
import Banner from "../Components/FilmeBanner";
import Nome from "../Components/FilmeNome"
import Header from '../Components/FilmeHeader'
import Elenco from '../Components/FilmeElenco'
import ComentariosContainer from '../Components/ComentariosContainer'
import { Link } from "react-router-dom";
import { filmes } from '../Services/FilmesMock';
import Carrossel from "../Components/Carrossel";
import filmeService from "../Services/FilmesService";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import NaveBar from "../Components/NavBar";
import { useEffect, useState } from "react";


function FilmePage() {

    const { id } = useParams(); // pega o parâmetro da URL
    const filmeId = parseInt(id);

    const [filme, setFilme] = useState(null);

    useEffect(() => {   
        const loadingFilme = async () => {
            const result = await  filmeService.getById(filmeId);
            console.log(result);
            setFilme(result);
        }
        console.log(filmeId);
        loadingFilme();
    }, [filmeId]);

    if (!filme) return <NotFound/>
    return (
        <div className="Filme">
            <div className="Navbar">
                <NaveBar/>
            </div>
            <div className="PaidetodosFilme">
                <div className="divFilmeBanner">
                    <Banner filme={filme}/>
                </div>

                <div className="infos">
                    <Header filme={filme}/>
                </div>

            </div>

            <div className="container-comentarios">
                <ComentariosContainer filme={filme}/>
            </div>

            <div className="container-relacionados">
                <Carrossel listadeFilmes={filmes} descricao="Relacionados"/>
            </div>

        </div>

    );
}

export default FilmePage;
