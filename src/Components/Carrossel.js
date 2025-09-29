import CardFilme from "./CardFilme";
import "./Carrossel.css";

function Carrossel ({listadeFilmes, descricao, pExpandido = false}) {
    return(
        <div className="minhaLista">

            <span>{descricao}</span>
            
            <div className="carrosel">
                {
                    listadeFilmes.map((filme, idx) => 
                        <CardFilme key={idx} filme={filme} expandido={pExpandido} />
                    )
                }
            </div>     
        </div>
    );
}

export default Carrossel;