import "./NavBar.css"
import logo from "../Imagens/netflix.png"
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";

function NavBar() {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const u = localStorage.getItem('usuarioLogado');
        setUsuario(JSON.parse(u));
    },[]);

    console.log(usuario);
    return (

        <div className="nav-bar-pai">

            <div className="nav-bar-link">

                <img src={logo} className="imagem"></img>
                

                <Link to="/home"  className="link"  >
                    <span>Início</span>
                </Link>

                <Link to="/catalogo/series" className="link">
                    <span >Séries</span>
                </Link>

                <Link to="/catalogo/filmes" className="link">
                    <span >Filmes</span>
                </Link>

                <Link to="/catalogo/bombando" className="link">
                    <span >Bombando</span>
                </Link>
                <Link to="/catalogo/minhalista" className="link">
                    <span >Minha lista</span>
                </Link>
            </div>

            <div className="nav-bar-conta">
                <img src={usuario?.avatarImage} className="foto-conta"></img>
                <Link to="/config" className="linkconta">
                    <span >{usuario?.apelidoName}</span>
                </Link>

            </div>

        </div>
    )
}

export default NavBar;