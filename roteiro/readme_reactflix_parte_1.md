# ReactFlix — Catálogo de Filmes com Playlists e Comentários

ReactFlix é uma aplicação React que simula uma plataforma de streaming de filmes. Usuários podem navegar entre filmes, canais e playlists, adicionar filmes a playlists, comentar e avaliar os filmes.

Esta é a **Parte 1** do guia de desenvolvimento. Aqui, cobriremos os seguintes passos:

-

---

## 1. Criar o Projeto React

Instalar create-react-app com
```sh
  npm instal -g create-react-app
```

```bash
npx create-react-app reactflix
```
Navegue até a nova pasta do projeto reactflix no seu **VScode**. Arquivo -> Abrir pasta... seleciona a nova pasta récem criada
.
## 2. Instalar Dependências

```bash
npm install react-router-dom bootstrap
```

## 3. Configurar o Bootstrap no projeto

No topo do arquivo `src/index.js`, adicione:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

Isso é necessário para que todo o projeto tenha acesso aos componentes do bootstrap.

## 4. Estrutura de Pastas

No diretório `src/`, crie as seguintes pastas:

```bash
mkdir src/components src/pages src/services src/assets
```

Organização sugerida:

```
src/
├── components/          # Componentes reutilizáveis (Navbar, Comentario, FilmeCard etc.)
├── pages/               # Páginas completas (Home, FilmePage, CanalPage, UsuarioPage)
├── services/            # Serviços de dados (simulados ou integração futura com backend)
├── assets/              # Imagens e recursos estáticos
├── App.js               # Definição de rotas
├── index.js             # Ponto de entrada da aplicação
```

## 5. Configuração do React Router

Altere o arquivo `src/index.js` com a import do boostrap e você também pode remover 
o reportWebVitals.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Para testar a aplicação, execute no terminal
```sh
  npm start
```

Depois de um tempo[paciência :)], o navegador vai abrir com um ícone da logo do react.

## 6. Definir Rotas Iniciais

O arquivo src/App é o arquivo principal de aplicação. Tanto que é referenciado no src/index.js.

Vamos zerar o arquivoz App.js:

```js
import './App.css';

function App() {
  return (
    <>
      <h1>Teste</h1>
    </>
  );
}

export default App;

```
Agora vamos criar nossos componentes:

## 7. Navbar Comum a Todas as Páginas

### Crie o arquivo `src/components/Navbar.js`:

```js
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">ReactFlix</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/filmes">Filmes</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
```

## 8. Criar as Páginas Iniciais

### Criar o arquivo `src/pages/Home.js`

```js
const Home = () => (
  <div className="container mt-5">
    <h1>ReactFlix</h1>
    <p>Bem-vindo à sua plataforma de filmes interativa!</p>
  </div>
);

export default Home;
```

### Criar o arquivo `src/pages/FilmesList.js`

```js
const FilmesList = () => (
  <div className="container mt-5">
    <h1>Filmes</h1>
    <p>Lista de filmes em destaque.</p>
  </div>
);

export default FilmesList;
```

### Criar o arquivo `src/pages/FilmePage.js`

```js
const FilmePage = () => (
  <div className="container mt-5">
    <h1>Detalhes do Filme</h1>
    <p>Aqui serão exibidos os detalhes do filme selecionado.</p>
  </div>
);

export default FilmePage;
```
Uma vez que os arquivos foram criados, vamos referenciar eles no src/App.js.

Edite o arquivo inserindo as rotas `src/App.js`. Ele tem referências para 4 arquivos que criamos a pouco:

Os arquivos serão criados na pasta pages e se chamam: Home.js, FilmePage.js, FilmeList.js e Navbar.js.


```js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FilmesList from './pages/FilmesList';
import FilmePage from './pages/FilmePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmes" element={<FilmesList />} />
        <Route path="/filmes/:id" element={<FilmePage />} />
      </Routes>
    </>
  );
}

export default App;
```


## 9. Criar `FilmesService.js` com dados mockados

Crie o arquivo `src/services/FilmesService.js`:

```js
class FilmesService {
  filmes = [
    { id: 1, titulo: 'Interestelar', genero: 'Ficção Científica', duracao: 169, ano_lancamento: 2014, nota_avaliacao: 9.0 },
    { id: 2, titulo: 'A Origem', genero: 'Ação', duracao: 148, ano_lancamento: 2010, nota_avaliacao: 8.8 },
  ];

  comentarios = [
    { id_filme: 1, autor: 'João', texto: 'Obra-prima!', data: '2023-11-15', avaliacao: 10 },
    { id_filme: 2, autor: 'Maria', texto: 'Muito criativo!', data: '2023-12-01', avaliacao: 9.5 },
  ];

  getFilmes() {
    return this.filmes;
  }

  getFilmeById(id) {
    return this.filmes.find(f => f.id === parseInt(id));
  }

  getComentariosByFilmeId(id) {
    return this.comentarios.filter(c => c.id_filme === parseInt(id));
  }

  addComentario(id_filme, comentario) {
    this.comentarios.push({ id_filme, ...comentario });
  }
}

const filmesService = new FilmesService();
export default filmesService;
```

---

> Na Parte 2B vamos:
>
> - Usar o `FilmesService` na página `FilmesList`
> - Implementar navegação para detalhes
> - Exibir dados reais do filme na `FilmePage`
> - Adicionar lista de comentários e formulário para novo comentário

