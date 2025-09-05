import "./Conta.css";
import master from "../Imagens/mastercard.png";

function Conta() {

    return(

        <div className="conteudo">

          
                <span className="conta1">Conta</span>
                <span className="conta2">Detalhes da assinatura</span>

            <div className="card1">

                <div className="degrade">

                    <span>Assinante desde julho de 2015</span>
                    
                </div>

                <div className="alinhamento">
                    <span className="plano">Plano Padrão</span>

                    <span className="pagamento">Próximo pagamento: 31 de janeiro de 2025</span>

                    <div className="senha">
                        <img src={master} className="mastercard"></img>
                        <span>•••• •••• •••• 2777</span>
                    </div>

                    <span className="linha"></span>

                    <div className="gerenciamento">
                        <span id="gerenciar">Gerenciar assinatura</span>

                    </div>
                </div>

            </div>

        </div>


    );



}

export default Conta;