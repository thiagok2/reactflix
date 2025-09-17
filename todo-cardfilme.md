/**
 * TODO
 * 
 * 1. Criar div principal, criar classe css
 * 2. Colocar como background a imagem do filme. Observar a HomePage:
 *  style={{ backgroundImage: `url(${filmeTopo.fotoThumbnail})` }}
 *  e o css()
 * 3. Criar divs internas: card-header, card-footer
 * 4. Criar divs internos: 
 * 
 */

```js
import { Link } from "react-router-dom";
import "./CardFilme.css";


function CardFilme ({filme}) {

    return (
        
        <div className="container" style={{ backgroundImage: `url(${filme.fotoThumbnail})` }}>
            <Link to={`/filme/${filme.id}`} >
                <div className="card-header">
                    <span className="item-avaliacao">{filme.nota_avaliacao}</span>
                    <span className="item-comentarios">{filme.numero_comentarios}</span>
                </div>
                
                <div className="card-footer">
                    <span className="item-titulo">
                        {filme.titulo}
                    </span>
                </div>
            </Link>
        </div>
        
    )
}

export default CardFilme;
```