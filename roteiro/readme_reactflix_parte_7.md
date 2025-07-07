# ReactFlix - Parte 7: Criar Playlists Dinamicamente e Exibir Ranking de Filmes

Nesta etapa, vamos adicionar funcionalidades para:

- Criar novas playlists dinamicamente com formulário
- Evitar nomes duplicados
- Exibir um ranking de filmes com base nas notas dos usuários

---

## 30. Atualizar `FilmesService.js` para suportar criação de playlists

Adicione este método:

```js
criarPlaylist(nome) {
  if (this.playlists.find(p => p.nome.toLowerCase() === nome.toLowerCase())) {
    throw new Error('Já existe uma playlist com este nome');
  }

  const nova = {
    id: this.playlists.length + 1,
    nome,
    filmes: []
  };
  this.playlists.push(nova);
  return nova;
}
```

---

## 31. Criar `PlaylistForm.js`

Crie `src/components/PlaylistForm.js`:

```js
import { useState } from 'react';
import filmesService from '../services/FilmesService';

const PlaylistForm = ({ onNovaPlaylist }) => {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const nova = filmesService.criarPlaylist(nome);
      onNovaPlaylist(nova);
      setNome('');
      setErro('');
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Nova Playlist</h4>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nome da playlist"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">Criar</button>
      </div>
      {erro && <div className="text-danger mt-1">{erro}</div>}
    </form>
  );
};

export default PlaylistForm;
```

---

## 32. Integrar `PlaylistForm` à página de playlists

Em `PlaylistsPage.js`, importe e use:

```js
import PlaylistForm from '../components/PlaylistForm';

...

<PlaylistForm onNovaPlaylist={(nova) => setPlaylists([...playlists, nova])} />
```

Insira isso **antes** do `<ul className="list-group">`

---

## 33. Criar `RankingPage.js`

Novo arquivo: `src/pages/RankingPage.js`

```js
import filmesService from '../services/FilmesService';
import { useEffect, useState } from 'react';

const RankingPage = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const mapa = new Map();

    filmesService.getPlaylists().forEach(pl => {
      pl.filmes.forEach(f => {
        if (f.assistido && f.nota_usuario) {
          const filme = filmesService.getFilmeById(f.id_filme);
          if (!mapa.has(f.id_filme)) {
            mapa.set(f.id_filme, { ...filme, total: 0, count: 0 });
          }
          const ref = mapa.get(f.id_filme);
          ref.total += f.nota_usuario;
          ref.count += 1;
        }
      });
    });

    const lista = Array.from(mapa.values()).map(f => ({
      ...f,
      media: (f.total / f.count).toFixed(2)
    })).sort((a, b) => b.media - a.media);

    setRanking(lista);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Ranking de Filmes</h2>
      <ol className="list-group list-group-numbered">
        {ranking.map(f => (
          <li key={f.id} className="list-group-item d-flex justify-content-between">
            <span>{f.titulo}</span>
            <span><strong>{f.media}</strong></span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RankingPage;
```

Adicione no `App.js`:

```js
import RankingPage from './pages/RankingPage';
...
<Route path="/ranking" element={<RankingPage />} />
```

E no `Navbar.js`:

```js
<li className="nav-item">
  <Link className="nav-link" to="/ranking">Ranking</Link>
</li>
```

---

Na Parte 8:

- Adicionar `marcar como assistido` e `avaliar` diretamente pela playlist
- Melhorar usabilidade com confirmação e feedbacks
- Preparar mock de usuários (login fictício)
- Refatorar estrutura para integração futura com backend

Deseja seguir com a Parte 8? Ou revisar algo nesta etapa?

