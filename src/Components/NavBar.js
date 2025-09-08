import "./NavBar.css"
import logo from "../Imagens/netflix.png"
import { FaRegUser } from "react-icons/fa6";
import {Link} from 'react-router-dom'

function NaveBar (){

    return(
        <div className="nav-bar">
            <div className="navegue">
                <Link to="/home">
                    <img src={logo} class="imagem"></img>
                </Link>
                <Link to="/home">
                    <span className="link">Início</span>
                </Link>
                <Link to="/catalogo/series">
                    <span className="link">Séries</span>
                </Link>
                <Link to="/catalogo/filmes">
                    <span className="link">Filmes</span>
                </Link>
                <Link to="/catalogo/bombando">
                    <span className="link">Bombando</span>
                </Link>
                <Link to="/catalogo/minhalista">
                    <span className="link">Minha lista</span>
                </Link>
            </div>

            <div className="conta">
                <FaRegUser />

                <Link to ="/config">
                    <span className="linkconta">Conta</span>
                </Link>

            </div>

        </div>
    )
}

export default NaveBar;