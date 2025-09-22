import CardFilme from "./CardFilme";
import "./Carrossel.css";

function Carrossel ({listadeFilmes, descricao, expandido = false}) {
    return(
        <div className="minhaLista">

            <span>{descricao}</span>
            
            <div className="carrosel">
                {
                    listadeFilmes.map((filme, idx) => 
                        <CardFilme key={idx} filme={filme} expandido />
                    )
                }
            </div>     
        </div>
    );
}

export default Carrossel;