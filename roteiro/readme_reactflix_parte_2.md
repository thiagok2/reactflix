# ReactFlix - Parte 2B

Nesta segunda parte, continuaremos o desenvolvimento da aplicação ReactFlix, com os seguintes objetivos:

- Usar o `FilmesService` na página `FilmesList`
- Exibir filmes reais em lista, com links para detalhes
- Usar `useParams` para carregar o filme na `FilmePage`
- Exibir os comentários do filme selecionado
- Criar componente reutilizável para comentários (`ComentarioList`)

---

## 10. Listar Filmes com Link para Detalhes

Edite o arquivo `src/pages/FilmesList.js`:

```js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import filmesService from '../services/FilmesService';

const FilmesList = () => {
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

export default FilmesList;
```

---

## 11. Exibir Detalhes do Filme Selecionado

Edite `src/pages/FilmePage.js`:

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

  if (!filme) return <p className="container mt-5">Filme não encontrado.</p>;

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

## 12. Criar o Componente `ComentarioList`

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

---

Na próxima parte:
- Criar o formulário para adicionar novo comentário (`ComentarioForm`)
- Integrar o formulário com `FilmesService`
- Permitir que o usuário adicione comentários em tempo real
- Separar layout em colunas, adicionar imagens

