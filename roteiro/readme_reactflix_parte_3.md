# ReactFlix - Parte 3: Comentários Interativos

Nesta parte do projeto, tornaremos a página de detalhes do filme mais funcional com os seguintes avanços:

- Criação do componente `ComentarioForm`
- Permitir que o usuário envie um novo comentário
- Atualizar a lista de comentários em tempo real
- Pequenas melhorias visuais

---

## 13. Criar `ComentarioForm.js`

Crie o arquivo `src/components/ComentarioForm.js`:

```js
import React, { useState } from 'react';
import filmesService from '../services/FilmesService';

const ComentarioForm = ({ idFilme, onNovoComentario }) => {
  const [autor, setAutor] = useState('');
  const [texto, setTexto] = useState('');
  const [avaliacao, setAvaliacao] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!autor || !texto) return;

    const comentario = {
      autor,
      texto,
      data: new Date().toISOString().split('T')[0],
      avaliacao: parseFloat(avaliacao)
    };

    filmesService.addComentario(idFilme, comentario);

    // Chama a função passada como prop para recarregar a lista de comentários
    onNovoComentario();

    // Limpa os campos
    setAutor('');
    setTexto('');
    setAvaliacao(10);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Adicionar Comentário</h5>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input type="text" className="form-control" value={autor} onChange={e => setAutor(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Comentário</label>
        <textarea className="form-control" rows="3" value={texto} onChange={e => setTexto(e.target.value)}></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Nota</label>
        <input type="number" className="form-control" min="0" max="10" step="0.1" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
};

export default ComentarioForm;
```

---

## 14. Atualizar `ComentarioList.js` para aceitar novo envio

Edite o arquivo `src/components/ComentarioList.js`:

```js
import React, { useEffect, useState } from 'react';
import filmesService from '../services/FilmesService';
import ComentarioForm from './ComentarioForm';

const ComentarioList = ({ idFilme }) => {
  const [comentarios, setComentarios] = useState([]);

  const carregarComentarios = () => {
    const lista = filmesService.getComentariosByFilmeId(idFilme);
    setComentarios(lista);
  };

  useEffect(() => {
    carregarComentarios();
  }, [idFilme]);

  return (
    <div className="mt-4">
      <ComentarioForm idFilme={idFilme} onNovoComentario={carregarComentarios} />

      <h5 className="mt-4">Comentários</h5>
      {comentarios.length === 0 && <p className="text-muted">Nenhum comentário ainda.</p>}

      <ul className="list-group">
        {comentarios.map((comentario, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{comentario.autor}</strong> ({comentario.data}):<br />
            {comentario.texto}<br />
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

## 15. Resultado Esperado na `FilmePage`

Ao acessar `/filmes/1` ou qualquer ID válido:

- O usuário vê os detalhes do filme
- Abaixo, ele vê uma seção com formulário para comentar
- Ao enviar o comentário, a lista é atualizada automaticamente

---

Na Parte 4:
- Exibir os filmes em cards (ex: `FilmeCard`) com imagem fictícia
- Melhorar visual da `FilmePage` (colunas, detalhes, poster)
- Exibir média de avaliações do filme
- (opcional) permitir que o comentário use avatar aleatório

