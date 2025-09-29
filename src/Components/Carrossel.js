import CardFilme from "./CardFilme";
import "./Carrossel.css";

<<<<<<< HEAD
function Carrossel ({ listadeFilmes, descricao, expandido = false }) {
    return (
=======
function Carrossel ({listadeFilmes, descricao, pExpandido = false}) {
    return(
>>>>>>> 3718fb15452502a85b39687c01d24da873e86ea0
        <div className="minhaLista">

          
            <h2 className="titulo-carrossel">{descricao}</h2>
            
            <div className="carrosel">
                {
                    listadeFilmes.map((filme, idx) => 
<<<<<<< HEAD
                        <CardFilme key={idx} filme={filme} expandido={expandido} />
=======
                        <CardFilme key={idx} filme={filme} expandido={pExpandido} />
>>>>>>> 3718fb15452502a85b39687c01d24da873e86ea0
                    )
                }
            </div>     
        </div>
    );
}

export default Carrossel;
