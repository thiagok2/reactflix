import React, { useEffect, useState } from "react";
import "./HomePage.css";

import NaveBar from "../Components/NavBar";
import filmeService from "../Services/FilmesService";
import Carrossel from "../Components/Carrossel";
import CarroselNum from "../Components/CarroselNum";

import FilmeDestaque from "../Components/FilmeDestaque";

import { filmesNum } from "../Services/FilmesMock";

function HomePage() {
    const [filmeTopo, setFilmeTopo] = useState(null);
    const [series, setSeries] = useState([]);
    const [filmes, setFilmes] = useState([]);
    const [clicados, setClicados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const [fPopular, sPopular] = await Promise.all([
                    filmeService.fetchPopular(),
                    filmeService.fetchByTipo("s")
                ]);

                if (!mounted) return;
                setFilmes(fPopular || filmeService.getFilmes());
                setSeries(sPopular || filmeService.getSeries());
                setClicados(filmeService.getClicados());
                setFilmeTopo((fPopular && fPopular[0]) || filmeService.getRandomFilme());
            } catch (err) {
                console.error(err);
                setError(err.message || "Erro ao carregar dados");
                // fallback para mocks
                setFilmes(filmeService.getFilmes());
                setSeries(filmeService.getSeries());
                setClicados(filmeService.getClicados());
                setFilmeTopo(filmeService.getRandomFilme());
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, []);

    if (loading) return <div className="tela">Carregando...</div>;
    if (error) return <div className="tela">{error}</div>;

    return (
        <div className="tela" style={{ backgroundImage: `url(${filmeTopo?.fotoThumbnail})` }}>
            <div className="casa">
                <NaveBar />
                <FilmeDestaque filme={filmeTopo} />

                <div className="todosFilme">
                    <Carrossel listadeFilmes={filmes} descricao="Filmes novos" />
                    <Carrossel listadeFilmes={series} descricao="Novidades nas séries" pExpandido={true} />

                    {clicados?.length > 0 && (
                        <Carrossel listadeFilmes={clicados} descricao="Filmes do seu interesse" />
                    )}

                    <CarroselNum listaNumerada={filmesNum} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;