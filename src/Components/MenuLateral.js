import "./MenuLateral.css"
import { PiHouseFill } from "react-icons/pi";
import { TiCreditCard } from "react-icons/ti";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { PiDevicesLight } from "react-icons/pi";
import { CiFaceSmile } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";

function MenuLateral() {

    return(

        <div className="lateral">

            <div className="secao">
                <FaArrowLeft className="icon" />
                <a>Voltar à Netflix</a>

            </div>


            <div >

                    
                <div className="secao">
                    <PiHouseFill className="icon" />
                    <span>Visão geral</span>

                </div>

                <div className="secao">
                    <TiCreditCard className="icon" />
                    <span>Assinatura</span>

                </div>

                <div className="secao">
                    <IoShieldCheckmarkOutline className="icon" />
                    <span>Segurança</span>

                </div>

                <div className="secao">
                    <PiDevicesLight className="icon" />
                    <span>Aparelhos</span>

                </div>

                <div className="secao">
                    <CiFaceSmile className="icon" />
                    <span>Perfis</span>

                </div>

            </div>

        </div>
    )
}

export default MenuLateral;