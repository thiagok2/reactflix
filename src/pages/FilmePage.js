import React, { useEffect, useState } from "react";
import "./FilmePage.css";
import Banner from "../Components/FilmeBanner";
import Nome from "../Components/FilmeNome";
import Header from "../Components/FilmeHeader";
import Elenco from "../Components/FilmeElenco";
import ComentariosContainer from "../Components/ComentariosContainer";
import { Link } from "react-router-dom";
import { filmes } from "../Services/FilmesMock";
import Carrossel from "../Components/Carrossel";
import filmeService from "../Services/FilmesService";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import NaveBar from "../Components/NavBar";

function FilmePage() {
    const { id } = useParams(); // pega o parâmetro da URL
    const filmeId = id ? parseInt(id, 10) : null;

    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                if (filmeId) {
                    const result = await filmeService.fetchById(filmeId);
                    if (!mounted) return;
                    setFilme(result);
                } else {
                    setFilme(filmeService.getRandomFilme());
                }
            } catch (err) {
                console.error(err);
                setError(err.message || "Erro ao buscar filme");
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, [filmeId]);

    if (loading) return <div className="Filme">Carregando...</div>;
    if (error) return <div className="Filme">{error}</div>;
    if (!filme) return <NotFound />;

    return (
        <div className="Filme">
            <div className="Navbar">
                <NaveBar />
            </div>
            <div className="PaidetodosFilme">
                <div className="divFilmeBanner">
                    <Banner filme={filme} />
                </div>

                <div className="infos">
                    <div className="Nome"> <Nome filme={filme} /> </div>
                    <Header filme={filme} />

                    <div className="atores-container">
                        <Elenco filme={filme} />
                    </div>
                </div>

            </div>

            <div className="container-comentarios">
                <ComentariosContainer filme={filme} />
            </div>

            <div className="container-relacionados">
                <Carrossel listadeFilmes={filmes} descricao="Relacionados" />
            </div>

        </div>
    );
}

export default FilmePage;
