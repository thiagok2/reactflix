import React, { useEffect, useState } from "react";
import "./CatalogoPage.css";

import NavBar from "../Components/NavBar";
import { Link, useParams } from "react-router-dom";
import filmesService from "../Services/FilmesService";
import { FaComments } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

function CatalogoPage() {
    const { tipo } = useParams();
    let paramTipo = tipo === "series" ? "s" : "f";

    const [filmeList, setFilmeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const list = await filmesService.fetchByTipo(paramTipo);
                if (!mounted) return;
                setFilmeList(list || filmesService.getFilmesPorTipo(paramTipo));
            } catch (err) {
                console.error(err);
                setError(err.message || "Erro ao carregar catálogo");
                setFilmeList(filmesService.getFilmesPorTipo(paramTipo));
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, [paramTipo]);

    const handleAddClicados = (filme) => {
        filmesService.addFilmeClicado(filme);
    };

    if (loading) return <div className="container">Carregando catálogo...</div>;
    if (error) return <div className="container">{error}</div>;

    return (
        <div className="container">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="containers-catalogo">
                {filmeList.map((filme, idx) => (
                    <Link key={idx} className="container-filme" onClick={() => handleAddClicados(filme)}>
                        <div className="header-filme">
                            <span className="filme-titulo">{filme.titulo}</span>
                            <span className="filme-comentarios"> <FaComments /> {filme.numero_comentarios}</span>
                        </div>

                        <div className="img-container">
                            <Link className="card-filmes" to={`/filme/${filme.id}`} >
                                <img src={filme.fotoThumbnail} className="foto" alt={filme.titulo} />
                            </Link>
                        </div>

                        <div className="filme-subtitulo">
                            <div className="subitem-header">{filme.nota_avaliacao} <FaStar className='star' /></div>
                            <div className="subitem-header faixa">{filme.faixa_etaria}</div>
                        </div>
                        {filme.temporadas && (
                            <div className="item-opcional">{filme.temporadas} temporadas</div>
                        )}
                        <div className="introducao">
                            {filme.sinopse}
                        </div>
                        <div className="footer-filme">
                            <div className="footer-item"> {filme.elenco}</div>
                            <div className="footer-item"> {filme.genero}</div>
                            <div className="footer-item">Lançamento: {filme.ano_lancamento}</div>
                            {filme.indicacoes_premios?.length > 0 && (
                                <div className="footer-item">Indicações: {filme.indicacoes_premios}</div>
                            )}
                        </div>
                    </Link>
                ))}

            </div>

        </div>
    )
}

export default CatalogoPage;
