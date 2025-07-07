# ReactFlix - Parte 8: Marcar como Assistido, Avaliar e Preparar Login Simulado

Nesta etapa, adicionaremos interação direta na playlist para que o usuário possa:

- Marcar um filme como assistido diretamente na playlist
- Atribuir uma nota (de 1 a 5)
- Exibir mensagens de confirmação simples após cada ação
- Introduzir conceito de "usuário atual simulado" (login fictício)

---

## 34. Atualizar `FilmesService.js`: marcar como assistido e avaliar

Adicione os métodos:

```js
marcarComoAssistido(id_playlist, id_filme) {
  const pl = this.getPlaylistById(id_playlist);
  const f = pl.filmes.find(f => f.id_filme === id_filme);
  if (f) f.assistido = true;
},

atribuirNota(id_playlist, id_filme, nota) {
  const pl = this.getPlaylistById(id_playlist);
  const f = pl.filmes.find(f => f.id_filme === id_filme);
  if (f) f.nota_usuario = nota;
}
```

---

## 35. Atualizar `PlaylistDetalhePage.js`

Modifique cada item da lista para incluir:

- Botão "Marcar como assistido"
- Se já assistido: input de nota (1 a 5)

Atualize a renderização do `playlist.filmes.map(...)`:

```js
<li key={idx} className="list-group-item">
  <div className="d-flex justify-content-between align-items-center">
    <div>
      <Link to={`/filmes/${filme.id}`}>{filme.titulo}</Link>
      <br />
      {item.assistido ? (
        <>
          <span className="text-success">Assistido ✓</span>
          <br />
          <label>Nota:</label>
          <input
            type="number"
            className="form-control form-control-sm"
            min="1"
            max="5"
            style={{ width: '60px' }}
            value={item.nota_usuario || ''}
            onChange={(e) => {
              filmesService.atribuirNota(playlist.id, filme.id, parseInt(e.target.value));
              carregar();
              alert('Nota salva!');
            }}
          />
        </>
      ) : (
        <button
          className="btn btn-sm btn-outline-success"
          onClick={() => {
            filmesService.marcarComoAssistido(playlist.id, filme.id);
            carregar();
            alert('Filme marcado como assistido!');
          }}
        >
          Marcar como assistido
        </button>
      )}
    </div>
    <button className="btn btn-outline-danger btn-sm" onClick={() => removerFilme(filme.id)}>
      Remover
    </button>
  </div>
</li>
```

---

## 36. Simular usuário atual

Crie o arquivo `src/services/AuthService.js`:

```js
const AuthService = {
  usuarioAtual: {
    id: 1,
    nome: 'João da Silva',
    email: 'joao@email.com'
  },

  getUsuario() {
    return this.usuarioAtual;
  }
};

export default AuthService;
```

Use isso para exibir o nome do usuário no `Navbar.js`:

```js
import AuthService from '../services/AuthService';
...
<li className="nav-item">
  <span className="nav-link disabled">Olá, {AuthService.getUsuario().nome}</span>
</li>
```

---

### Próxima Parte (9):

- Refatorar serviços para usar chamadas REST com `axios`
- Substituir simulação por backend real (Express + Sequelize)
- Enviar e buscar dados reais das APIs
- Criar contexto de autenticação com login/logout

Deseja que a próxima parte inicie esse processo ou prefere concluir mais melhorias visuais antes?

