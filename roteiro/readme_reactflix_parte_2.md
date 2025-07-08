# ReactFlix - Parte 2B

Nesta segunda parte, continuaremos o desenvolvimento da aplicação ReactFlix, com os seguintes objetivos:

- Usar o `FilmesService` na página `FilmesListPage`
- Exibir filmes reais em lista, com links para detalhes


- Usar `useParams` para carregar o filme na `FilmePage`
- Exibir os comentários do filme selecionado
- Criar componente reutilizável para comentários (`ComentarioList`)

---

## 10. Listar Filmes com Link para Detalhes


Edite o arquivo `src/pages/FilmesListPage.js`:

Primeiro passo, pode ser adicionar os imports:
```js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import filmesService from '../services/FilmesService';
```


O segundo passo é definir a constante filmes, que vai ser a lista de filme que será exibida na página. Para tal usamos o **useState**

Veja o trecho:

```js
//...
const FilmesPageList = () => {  
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const lista = filmesService.getFilmes();
    setFilmes(lista);
  }, []);
  //...

```

Sobre 🧠 useState e ⚙️ useEffect:

No React, os hooks useState e useEffect são essenciais para trabalhar com estado e efeitos colaterais em componentes funcionais.

🧠 useState
O useState é utilizado para declarar uma variável de estado dentro de um componente funcional.

```js
  const [filmes, setFilmes] = useState([]);
```
Neste exemplo:

1. filmes é o estado atual (inicialmente um array vazio []).
2. setFilmes é a função que atualiza esse estado.

Sempre que o setFilmes for chamado, o componente será re-renderizado com o novo valor de filmes.

Esse hook é ideal para armazenar dados dinâmicos, como:
1. Listas de itens,
2. Formulários preenchidos pelo usuário,
3. Dados recebidos de APIs, etc.

⚙️ useEffect
O useEffect é usado para executar **efeitos** colaterais após o componente ser renderizado.

```js
useEffect(() => {
  const lista = filmesService.getFilmes();
  setFilmes(lista);
}, []);
```

Neste exemplo, o efeito executa o código dentro da função somente uma vez, logo após o componente ser montado (porque o array de dependências [] está vazio).

Ou seja:
* Ele é ideal para buscar dados de um serviço ou API assim que o componente é exibido na tela.
* Dentro do useEffect, é comum fazer chamadas assíncronas, manipular DOM diretamente (se necessário), ou configurar e limpar listeners.

Ao testar a aplicação, com 
```js
  npm start
```

Até o momento, não haverá mudanças viuais, pois a instrução return não foi alterada. Ele continua retornado um dado fixo:

```js
  //...
 return (
    <div className="container mt-5">
      <h1>FilmesListPage</h1>
      <p>Lista de filmes em destaque.</p>
    </div>
  );
```

Por fim, agora vamos implementar a instrução de return que de fato vai retornar o conteúdo a ser renderizado:

```js
  return (
    <div className="container mt-5">
      <h1>Filmes Destaque</h1>
      <ul className="list-group">
        {filmes.map(filme => (
          <li key={filme.id} className="list-group-item d-flex justify-content-between">
            <Link to={`/filmes/${filme.id}`}>{filme.titulo}</Link>
            <span>{filme.ano_lancamento} - {filme.genero}</span>
          </li>
        ))}
      </ul>
    </div>
  )
```

Detalhes sobre o código acima.  O uso do .map sobre as coleção da variável(filmes) é bem comum em listagem.
O uso da tag Link é essencial e muito usada na navegação. Observe a linguagem de expressões com {} para interpolação dos dados das variáveis e conteúdo fixo em html. Repare tb as classes do bootstrap: container, list-group e list-group-item d-flex justify-content-between
 
O código final do componente vai ficar como a seguir:

```js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import filmesService from '../services/FilmesService';

const FilmesPageList = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const lista = filmesService.getFilmes();
    setFilmes(lista);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Filmes</h1>
      <ul className="list-group">
        {filmes.map(filme => (
          <li key={filme.id} className="list-group-item d-flex justify-content-between">
            <Link to={`/filmes/${filme.id}`}>{filme.titulo}</Link>
            <span>{filme.ano_lancamento} - {filme.genero}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmesPageList;
```

---

## 11. Exibir Detalhes do Filme Selecionado

Primeiro vamos garantir os imports, a definição do componente lendo o parâmetro.

Capturar o parametro com **useParams**;

Dentro **useEffect** recuperando o filme com o service;

E ao final alterando o return com os dados do filme.

```js

import React, { useEffect, useState } from 'react';
import { useEffect, useParams } from 'react-router-dom';
import filmesService from '../services/FilmesService';

const FilmePage = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const encontrado = filmesService.getFilmeById(id);
    setFilme(encontrado);
  }, [id]);

  return (
    <div className="container mt-5">
      <h1>{filme.titulo}</h1>
      <p><strong>Gênero:</strong> {filme.genero}</p>
      <p><strong>Duração:</strong> {filme.duracao} min</p>
      <p><strong>Ano:</strong> {filme.ano_lancamento}</p>
      <p><strong>Avaliação:</strong> {filme.nota_avaliacao}</p>

      <hr />

    </div>
  );
}
```

Antes de finalizarmos, vamos criar um componente de comentários:

## Criar o Componente `ComentarioList`

Crie o arquivo `src/components/ComentarioList.js`:

```js
import React, { useEffect, useState } from 'react';
import filmesService from '../services/FilmesService';

const ComentarioList = ({ idFilme }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const lista = filmesService.getComentariosByFilmeId(idFilme);
    setComentarios(lista);
  }, [idFilme]);

  return (
    <div>
      <h2>Comentários</h2>
      {comentarios.length === 0 && <p className="text-muted">Nenhum comentário ainda.</p>}
      <ul className="list-group">
        {comentarios.map((comentario, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{comentario.autor}</strong> ({comentario.data}):<br />
            {comentario.texto} <br />
            <small className="text-muted">Nota: {comentario.avaliacao}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComentarioList;
```

## Atualizando FilmePage para ter os comentários

Edite `src/pages/FilmePage.js` para ele incluir a linha:

```js
 <ComentarioList idFilme={filme.id} />
```

Assim ele está passando o idFilme como property(atributdo) do componente. Repare que isso é diferente de parâmetro. Parâmetro fica na URL, e propriedade fica na tag do componente.

```js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import filmesService from '../services/FilmesService';
import ComentarioList from '../components/ComentarioList';

const FilmePage = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const encontrado = filmesService.getFilmeById(id);
    setFilme(encontrado);
  }, [id]);

  if (!filme) 
    return <p className="container mt-5">Filme não encontrado.</p>;

  return (
    <div className="container mt-5">
      <h1>{filme.titulo}</h1>
      <p><strong>Gênero:</strong> {filme.genero}</p>
      <p><strong>Duração:</strong> {filme.duracao} min</p>
      <p><strong>Ano:</strong> {filme.ano_lancamento}</p>
      <p><strong>Avaliação:</strong> {filme.nota_avaliacao}</p>

      <hr />

      <ComentarioList idFilme={filme.id} />
    </div>
  );
};

export default FilmePage;
```


---

Na próxima parte:
- Criar o formulário para adicionar novo comentário (`ComentarioForm`)
- Integrar o formulário com `FilmesService`
- Permitir que o usuário adicione comentários em tempo real
- Separar layout em colunas, adicionar imagens

