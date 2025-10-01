import "./BarraConfig.css"
import logo from "../Imagens/logoincial.png"
import perfil from "../Imagens/logoincial.png";


function BarraConfig() { 
    return(
            <div className="navegueconfig">
                <img src={logo} class="imagem"></img>
                <div className="so">
                    <img src={perfil} className="perfil"></img>
                </div>
            </div>
     

    );


}

export default BarraConfig;