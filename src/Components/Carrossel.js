import CardFilme from "./CardFilme";
import "./Carrossel.css";

function Carrossel ({listadeFilmes, descricao, expandido = false}) {
    return(
        <div className="minhaLista">

          
            <h2 className="titulo-carrossel">{descricao}</h2>
            
            <div className="carrosel">
                {
                    listadeFilmes.map((filme, idx) => 
                        <CardFilme key={idx} filme={filme} expandido={expandido} />
                    )
                }
            </div>     
        </div>
    );
}

export default Carrossel;
