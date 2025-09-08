import './FilmeHeader.css'
import { Link } from 'react-router-dom'

function FilmeHeader({ filme }) {
    return (
        <div className='PaiHeader'>
            <div className='infoFilme'>
                <div className='Tempo'>Duração: {filme.duracao}</div>

                <div className='classificacao'>
                    <span className="idade">{filme.faixa_etaria}</span>
                </div>
               
                <div className='sobre'>Gênero: {filme.genero}</div>

                <div className='descricao'>
                    <div className='texto'>
                        {filme.sinopse}
                    </div>

                    <div className='card-menu'>
                        <Link className='cor-visao'>
                            COMENTÁRIOS
                        </Link>
                        <Link className='cor-visao' to={'/catalogo'}> 
                            TITULOS SEMELHANTES 
                        </Link>
                        <Link className='cor-visao'>
                            DETALHES
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FilmeHeader;
