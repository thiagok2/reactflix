# ReactFlix - Parte 4: Cards, Imagens e Avaliações

Agora vamos melhorar a experiência visual da aplicação com:

- Exibição de filmes em cards (com imagem)
- Cálculo da média de avaliações por filme
- Página de detalhes com layout mais rico (poster + informações em colunas)

---

## 16. Atualizar `FilmesService.js` com imagens

Edite `src/services/FilmesService.js` adicionando a propriedade `imagem` nos filmes:

```js
filmes = [
  {
    id: 1,
    titulo: 'Interestelar',
    genero: 'Ficção Científica',
    duracao: 169,
    ano_lancamento: 2014,
    nota_avaliacao: 9.0,
    imagem: 'https://via.placeholder.com/300x450?text=Interestelar'
  },
  {
    id: 2,
    titulo: 'A Origem',
    genero: 'Ação',
    duracao: 148,
    ano_lancamento: 2010,
    nota_avaliacao: 8.8,
    imagem: 'https://via.placeholder.com/300x450?text=A+Origem'
  },
];
```

---

## 17. Criar componente `FilmeCard`

Crie `src/components/FilmeCard.js`:

```js
import { Link } from 'react-router-dom';

const FilmeCard = ({ filme }) => {
  return (
    <div className="card mb-3" style={{ width: '18rem' }}>
      <img src={filme.imagem} className="card-img-top" alt={filme.titulo} />
      <div className="card-body">
        <h5 className="card-title">{filme.titulo}</h5>
        <p className="card-text">
          {filme.genero} | {filme.ano_lancamento}<br />
          Nota: {filme.nota_avaliacao}
        </p>
        <Link to={`/filmes/${filme.id}`} className="btn btn-primary btn-sm">
          Ver detalhes
        </Link>
      </div>
    </div>
  );
};

export default FilmeCard;
```

---

## 18. Atualizar `FilmesList.js` para exibir os cards

Edite `src/pages/FilmesList.js`:

```js
import React, { useEffect, useState } from 'react';
import filmesService from '../services/FilmesService';
import FilmeCard from '../components/FilmeCard';

const FilmesList = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    setFilmes(filmesService.getFilmes());
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Catálogo de Filmes</h1>
      <div className="row">
        {filmes.map(filme => (
          <div key={filme.id} className="col-md-4">
            <FilmeCard filme={filme} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmesList;
```

---

## 19. Melhorar layout da `FilmePage`

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
      <div className="row">
        <div className="col-md-4">
          <img src={filme.imagem} alt={filme.titulo} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h2>{filme.titulo}</h2>
          <p><strong>Gênero:</strong> {filme.genero}</p>
          <p><strong>Duração:</strong> {filme.duracao} min</p>
          <p><strong>Ano:</strong> {filme.ano_lancamento}</p>
          <p><strong>Nota inicial:</strong> {filme.nota_avaliacao}</p>
        </div>
      </div>

      <ComentarioList idFilme={filme.id} />
    </div>
  );
};

export default FilmePage;
```

---

## 20. (Opcional) Exibir avatar aleatório nos comentários

No `ComentarioList.js`, dentro do `.map`, adicione:

```js
<img
  src={`https://i.pravatar.cc/40?img=${(idx % 70) + 1}`}
  className="rounded-circle me-2"
  alt="avatar"
/>
```

Isso pode ser colocado antes do `<strong>{comentario.autor}</strong>` para um toque visual.

---

Na Parte 5:
- Introduzir gerenciamento de playlists
- Adicionar botão "Adicionar à Playlist"
- Criar tela do usuário com lista de filmes assistidos
- Adicionar opção de marcar como "assistido" e avaliado

