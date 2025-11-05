import './FilmeHeader.css'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom'

function FilmeHeader({ filme }) {
    return (
        <div className='PaiHeader'>
            <div className='infoFilme'>

                <div className='NomeFilme'>{filme.titulo}</div>
                    <div className='descricao'>{filme.descricao}</div>;
                    <div className='ano'>{filme.ano}</div>;
                    <div className='nota'>{filme.nota}</div>;
                    

                <div className='classificacao'>
                    <span className={ "faixa-etaria-icon " + (filme.faixa_etaria >= "16" ? "icon-red":"icon-green")}>
                        {filme.faixa_etaria}+
                    </span>

                    <div className='sobre'>{filme.genero}</div>
                </div>

             
                <div className='botoes-header'>
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
