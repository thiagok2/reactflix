# ReactFlix - Parte 5: Playlists do Usuário

Nesta etapa, introduziremos o conceito de playlists, permitindo que um usuário adicione filmes à sua própria lista, marque como assistido e atribua nota. Esta é uma simulação client-side, usando o mesmo padrão de dados mockados.

---

## 21. Atualizar `FilmesService.js` com estrutura de playlists

No final da classe `FilmesService`, adicione:

```js
  playlists = [
    {
      id: 1,
      nome: 'Minha Playlist',
      filmes: [
        // cada item tem id_filme, assistido, nota_usuario
      ]
    }
  ];

  getPlaylist() {
    return this.playlists[0];
  }

  adicionarFilmeNaPlaylist(id_filme) {
    const playlist = this.playlists[0];
    if (!playlist.filmes.find(f => f.id_filme === id_filme)) {
      playlist.filmes.push({ id_filme, assistido: false, nota_usuario: null });
    }
  }

  marcarAssistido(id_filme, nota_usuario) {
    const filme = this.playlists[0].filmes.find(f => f.id_filme === id_filme);
    if (filme) {
      filme.assistido = true;
      filme.nota_usuario = nota_usuario;
    }
  }
```

---

## 22. Criar botão "Adicionar à Playlist" na `FilmePage`

No final da coluna de detalhes do filme (`FilmePage.js`), adicione:

```js
import { useState } from 'react';

...

const [adicionado, setAdicionado] = useState(false);

const adicionarNaPlaylist = () => {
  filmesService.adicionarFilmeNaPlaylist(filme.id);
  setAdicionado(true);
};

...

<p>
  <button
    className="btn btn-success"
    onClick={adicionarNaPlaylist}
    disabled={adicionado}
  >
    {adicionado ? 'Adicionado!' : 'Adicionar à Playlist'}
  </button>
</p>
```

---

## 23. Criar página `UsuarioPage.js`

Crie `src/pages/UsuarioPage.js`:

```js
import filmesService from '../services/FilmesService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UsuarioPage = () => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    setPlaylist(filmesService.getPlaylist());
  }, []);

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
                  <Link to={`/filmes/${filme.id}`}>{filme.titulo}</Link>
                  <div>
                    {item.assistido ? (
                      <span className="text-success">Assistido ✓ | Nota: {item.nota_usuario}</span>
                    ) : (
                      <span className="text-muted">Ainda não assistido</span>
                    )}
                  </div>
                </div>
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

export default UsuarioPage;
```

---

## 24. Adicionar link para "Minha Playlist" no Navbar

Edite `src/components/Navbar.js` e inclua:

```js
<li className="nav-item">
  <Link className="nav-link" to="/usuario">Minha Playlist</Link>
</li>
```

E adicione a rota no `App.js`:

```js
import UsuarioPage from './pages/UsuarioPage';
...
<Route path="/usuario" element={<UsuarioPage />} />
```

---

## 25. (Extra) Permitir marcar como assistido e avaliar na `FilmePage`

Adicione abaixo do botão "Adicionar à Playlist" um mini-formulário:

```js
const [nota, setNota] = useState('');
const [avaliado, setAvaliado] = useState(false);

const avaliarFilme = () => {
  filmesService.marcarAssistido(filme.id, nota);
  setAvaliado(true);
};

...
<div className="mt-3">
  <input type="number" min="0" max="10" step="0.1" value={nota} onChange={e => setNota(e.target.value)} placeholder="Sua nota" className="form-control mb-2" />
  <button onClick={avaliarFilme} className="btn btn-warning" disabled={avaliado || !nota}>
    {avaliado ? 'Avaliado!' : 'Marcar como assistido + Avaliar'}
  </button>
</div>
```

---

Na Parte 6:
- Separar playlists por nome do usuário (simulado)
- Permitir criar várias playlists
- Remover filme da playlist
- Usar localStorage para persistir dados (opcional)

