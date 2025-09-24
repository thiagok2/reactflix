import "./NavBar.css"
import logo from "../Imagens/stream.png"
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { TiHome } from "react-icons/ti";
import { ImFilm } from "react-icons/im";
import { PiFilmSlate } from "react-icons/pi";
import { BsFire } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
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
                <Link to="/"  className="link">
                    <img src={logo} className="imagem"></img>
                </Link>                

                <Link to="/home"  className="link"  >
                    <TiHome size={30}></TiHome>
                        <span>Inicio</span>
                </Link>

                <Link to="/catalogo/series" className="link">
                    <ImFilm size={30}></ImFilm>
                        <span >Séries</span>
                </Link>

                <Link to="/catalogo/filmes" className="link">

                    <PiFilmSlate size={30}></PiFilmSlate> 
                        <span >Filmes</span>
                </Link>

                <Link to="/catalogo/bombando" className="link">
                <BsFire size={25}></BsFire>
                    <span >Bombando</span>
                </Link>
                <Link to="/catalogo/minhalista" className="link">
                <FaRegBookmark size={25}></FaRegBookmark>
                    <span >Minha lista</span>
                </Link>
                <Link to="/catalogo/comunidade" className="link">
                <FaUserGroup size={25}></FaUserGroup>
                    <span >comunidade</span>
                </Link>
            </div>

            <div className="nav-bar-conta">
                <Link to="/perfil">
                  <img src={usuario?.avatarImage} className="foto-conta"></img>
                </Link>
                <Link to="/perfil" className="linkconta">
                    <span >{usuario?.apelidoName}</span>
                </Link>

            </div>

        </div>
    )
}

export default NavBar;