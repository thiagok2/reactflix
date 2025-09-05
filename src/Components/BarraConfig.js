import "./BarraConfig.css"
import logo from "../Imagens/netflix.png"
import perfil from "../Imagens/profile.jpg"
import { IoMdArrowDropdown } from "react-icons/io";

function BarraConfig() {
 
    return(




            <div className="navegueconfig">

                <img src={logo} class="imagem"></img>

                <div className="so">
                    <img src={perfil} className="perfil"></img>
                    <IoMdArrowDropdown />
                </div>
            </div>
     

    );


}

export default BarraConfig;