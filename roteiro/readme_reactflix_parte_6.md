# ReactFlix - Parte 6: Múltiplas Playlists e Gerenciamento

Nesta etapa, vamos permitir que o usuário:

- Crie múltiplas playlists com nomes diferentes
- Escolha em qual playlist deseja adicionar um filme
- Remova filmes de uma playlist
- Visualize todas suas playlists e seus conteúdos

**Nota**: Ainda estamos operando em ambiente client-side. Nada de `localStorage` ou backend por enquanto.

---

## 26. Atualizar `FilmesService.js` para múltiplas playlists

Altere a estrutura de playlists:

```js
  playlists = [
    {
      id: 1,
      nome: 'Favoritos Sci-fi',
      filmes: []
    },
    {
      id: 2,
      nome: 'Clássicos de Ação',
      filmes: []
    }
  ];

  getPlaylists() {
    return this.playlists;
  }

  getPlaylistById(id) {
    return this.playlists.find(p => p.id === parseInt(id));
  }

  adicionarFilmeNaPlaylist(id_playlist, id_filme) {
    const playlist = this.getPlaylistById(id_playlist);
    if (!playlist.filmes.find(f => f.id_filme === id_filme)) {
      playlist.filmes.push({ id_filme, assistido: false, nota_usuario: null });
    }
  }

  removerFilmeDaPlaylist(id_playlist, id_filme) {
    const playlist = this.getPlaylistById(id_playlist);
    playlist.filmes = playlist.filmes.filter(f => f.id_filme !== id_filme);
  }
```

---

## 27. Criar `PlaylistsPage.js`

Novo arquivo: `src/pages/PlaylistsPage.js`

```js
import React, { useEffect, useState } from 'react';
import filmesService from '../services/FilmesService';
import { Link } from 'react-router-dom';

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setPlaylists(filmesService.getPlaylists());
  }, []);

  return (
    <div className="container mt-5">
      <h2>Minhas Playlists</h2>
      <ul className="list-group">
        {playlists.map(pl => (
          <li key={pl.id} className="list-group-item d-flex justify-content-between">
            <span>{pl.nome}</span>
            <Link className="btn btn-outline-primary btn-sm" to={`/playlists/${pl.id}`}>Ver Filmes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistsPage;
```

Adicione rota no `App.js`:

```js
import PlaylistsPage from './pages/PlaylistsPage';
...
<Route path="/playlists" element={<PlaylistsPage />} />
```

E atualize o `Navbar.js`:

```js
<li className="nav-item">
  <Link className="nav-link" to="/playlists">Playlists</Link>
</li>
```

---

## 28. Criar `PlaylistDetalhePage.js`

Crie `src/pages/PlaylistDetalhePage.js`:

```js
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import filmesService from '../services/FilmesService';

const PlaylistDetalhePage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  const carregar = () => {
    const pl = filmesService.getPlaylistById(id);
    setPlaylist(pl);
  };

  useEffect(() => {
    carregar();
  }, [id]);

  const removerFilme = (id_filme) => {
    filmesService.removerFilmeDaPlaylist(playlist.id, id_filme);
    carregar();
  };

  return (
    <div className="container mt-5">
      <h2>{playlist?.nome}</h2>
      {playlist?.filmes?.length > 0 ? (
        <ul className="list-group">
          {playlist.filmes.map((item, idx) => {
            const filme = filmesService.getFilmeById(item.id_filme);
            return (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <Link to={`/filmes/${filme.id}`}>{filme.titulo}</Link><br />
                  {item.assistido ? (
                    <span className="text-success">Assistido ✓ - Nota: {item.nota_usuario}</span>
                  ) : (
                    <span className="text-muted">Não assistido</span>
                  )}
                </div>
                <button className="btn btn-outline-danger btn-sm" onClick={() => removerFilme(filme.id)}>
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Playlist vazia.</p>
      )}
    </div>
  );
};

export default PlaylistDetalhePage;
```

Adicione a rota no `App.js`:

```js
import PlaylistDetalhePage from './pages/PlaylistDetalhePage';
...
<Route path="/playlists/:id" element={<PlaylistDetalhePage />} />
```

---

## 29. Atualizar `FilmePage.js` para escolher a playlist ao adicionar

No lugar do `setAdicionado(true)` e `adicionarNaPlaylist()`, permita escolha:

```js
const [playlists, setPlaylists] = useState([]);
const [idPlaylistSelecionada, setIdPlaylistSelecionada] = useState('');

useEffect(() => {
  setPlaylists(filmesService.getPlaylists());
}, []);

const adicionarNaPlaylist = () => {
  if (idPlaylistSelecionada) {
    filmesService.adicionarFilmeNaPlaylist(parseInt(idPlaylistSelecionada), filme.id);
    alert('Filme adicionado!');
  }
};
```

E no JSX:

```js
<div className="mb-3">
  <label>Escolha a playlist:</label>
  <select
    className="form-select"
    value={idPlaylistSelecionada}
    onChange={(e) => setIdPlaylistSelecionada(e.target.value)}
  >
    <option value="">-- selecione --</option>
    {playlists.map(p => (
      <option key={p.id} value={p.id}>{p.nome}</option>
    ))}
  </select>
</div>

<button className="btn btn-success" onClick={adicionarNaPlaylist} disabled={!idPlaylistSelecionada}>
  Adicionar à Playlist
</button>
```

---

Na Parte 7:

- Criar componente `PlaylistForm` para criar novas playlists dinamicamente
- Validar duplicatas
- Habilitar reordenação de filmes na playlist
- Mostrar ranking com base nas notas atribuídas

