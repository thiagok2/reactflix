import "./TelaInicial.css";
import { Link } from "react-router-dom";
import { filmes } from "../Services/FilmesMock";
import Carrossel from "../Components/Carrossel";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import filmeService from "../Services/FilmesService";
import TeladeFundo from "../Imagens/teladefundo.jpg";

function TelaInicial() {
  const filmesEmAlta = filmeService.getFilmesEmAlta
    ? filmeService.getFilmesEmAlta()
    : filmes;

  return (
    <div className="TelaInicial">
      {/* Navbar global */}
      <header className="navbar-container">
        <NavBar />
      </header>

      {/* Seção principal (hero) */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Filmes, séries e muito mais. Sem limites.</h1>
          <p>Assista onde quiser. Cancele quando quiser.</p>
          <Link to="/SelecaoPerfil" className="link-entrar">
            <button className="btn-entrar">Entrar</button>
          </Link>
        </div>
      </section>

      {/* Carrossel */}
      <section className="carrossel-section">
        <h2>🔥 Em alta</h2>
        <Carrossel listadeFilmes={filmesEmAlta} descricao="Em alta" />
      </section>

      {/* Motivos para assinar */}
      <section className="motivos-section">
        <h2>Mais motivos para assinar</h2>
        <div className="motivos-grid">
          <div className="motivo-card">
            <span>📺</span>
            <h3>Aproveite na TV</h3>
            <p>
              Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV e
              outros dispositivos.
            </p>
          </div>

          <div className="motivo-card">
            <span>⬇️</span>
            <h3>Baixe séries para assistir offline</h3>
            <p>Salve seus títulos favoritos e veja quando quiser.</p>
          </div>

          <div className="motivo-card">
            <span>📱</span>
            <h3>Assista onde quiser</h3>
            <p>
              Curta filmes e séries em qualquer dispositivo — celular, tablet,
              laptop ou TV.
            </p>
          </div>

          <div className="motivo-card">
            <span>🧸</span>
            <h3>Perfis para crianças</h3>
            <p>
              Deixe as crianças explorarem seus personagens favoritos num espaço
              só para elas.
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default TelaInicial;
