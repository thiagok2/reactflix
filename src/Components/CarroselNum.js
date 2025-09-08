import { Link } from 'react-router-dom';
import './CarroselNum.css'


function CarroselNum({ listaNumerada }) {

    let i = 1;

    return (

        <div className="filmes">

            <span id='title'>Brasil: top 10 em séries hoje</span>

            <div className='carroselNum'>
              {
              listaNumerada.map(filme => (
                      <Link to={`/filme/${filme.id}`}>
                        <div className='conjuntoNum'>
                            <span className='numero'>{i++}</span>
                            <img src={filme.fotoThumbnail} className="fotoNum" />
                        </div>
                      </Link>
                ))
              }
            </div>
        </div>



    );

}

export default CarroselNum;
