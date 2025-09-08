import "./NavBar.css"
import logo from "../Imagens/netflix.png"
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'

function NavBar() {

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
                <FaRegUser />

                <Link to="/config" className="linkconta">
                    <span >Conta</span>
                </Link>

            </div>

        </div>
    )
}

export default NavBar;