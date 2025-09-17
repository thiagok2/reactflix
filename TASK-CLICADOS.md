FILME-DESTAQUE
```js

...

function FilmeDestaque({ filme }) {


    const handleAddInteresse = () => {
        //RECUPERAR UM OBJETO localstorage 'filmesClicados';
        //CASO ELE NAO EXISTA, CRIAR UM objeto 'filmesClicados'

        //caso haja o objeto, fazer o JSON.parse, para recuperar a lista de valores ja como objeto
        //caso nao haja, a lista inicia como vazia([]).

        //adiciona o filme desse destaque, o filme q foi passado no props, e já está no componente(filme) na lista filmesClicados.

        //uma adicionado a variavel, atualizar o conteudo dela no localstorage(setItem). Lembrar que precisa fazer o JSON.stringfy sobre filmesClicados.
       
    }

    return (
        
        <div className="detInical">
            <div className="filme-card">  

                <div className="logoNet">
                    <SiNetflix className="logo" />
                    <span className="nomeFilm">F I L M E</span>
                </div>

                <div className="title">
                    <span className="nomeFilme1"> {filme.titulo} </span>
                    <span className="nomeFilme2"> {filme.genero} </span>
                </div>

                <div className="info-pai">
                    <div className="option">
                        <Link to="/filme" className="mais-informacoes" onClick={handleAddInteresse}>
                            <CiCircleInfo className="ciculo" />
                            <span className="mais"> Mais informações</span>
                        </Link>
                        <Classificacao idade={filme.faixa_etaria}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FilmeDestaque;

```