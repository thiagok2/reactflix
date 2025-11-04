import "./NavBar.css"
import logo from "../Imagens/C.png"
import { Link } from 'react-router-dom'
import { TiHome } from "react-icons/ti";
import { ImFilm } from "react-icons/im";
import { PiFilmSlate } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { useEffect, useState } from "react";

function NavBar() {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const u = localStorage.getItem('usuarioLogado');
        setUsuario(JSON.parse(u));
    },[]);

    return (
        <div className="nav-bar-pai">

            <div className="nav-bar-link">
                <Link to="/" className="link">
                    <img src={logo} className="imagem" alt="logo" />
                </Link>                

                <Link to="/home" className="link">
                    <TiHome size={32} />
                    <span>Início</span>
                </Link>

                <Link to="/catalogo/series" className="link">
                    <ImFilm size={32} />
                    <span>Séries</span>
                </Link>

                <Link to="/catalogo/filmes" className="link">
                    <PiFilmSlate size={30} />
                    <span>Filmes</span>
                </Link>

                <Link to="/pages/comunidade" className="link">
                    <FaUserGroup size={25} />
                    <span>Comunidade</span>
                </Link>
            </div>

            <div className="nav-bar-conta">
                <Link to="/perfil">
                    <img src={usuario?.avatarImage} className="foto-conta" alt="perfil" />
                </Link>
                <Link to="/perfil" className="linkconta">
                    <span>{usuario?.apelidoName}</span>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
