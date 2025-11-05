import "./Sobre.css";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sobre() {
  const navigate = useNavigate();

  return (
    <div className="sobre-container">
      <div className="sobre-conteudo">

        <button className="sobre-voltar" onClick={() => navigate(-1)}>
          <FaAngleDoubleLeft className="icon-voltar" /> Voltar
        </button>

        <h1 className="sobre-titulo">🎬 Sobre o Cineverso</h1>
        <p className="sobre-texto">
          O <strong>Cineverso</strong> é um aplicativo criado para todos os
          apaixonados por filmes e séries. Nosso propósito é oferecer uma
          plataforma completa, onde você pode explorar os melhores títulos do
          cinema, descobrir lançamentos, montar suas listas personalizadas e
          mergulhar em um universo cheio de entretenimento.
        </p>
        <p className="sobre-texto">
          Este projeto foi desenvolvido com dedicação pela nossa equipe de
          colaboradores, que unem tecnologia, criatividade e amor pela sétima
          arte para tornar o <strong>Cineverso</strong> uma experiência única
          para cada usuário. 🍿✨
        </p>
      </div>
    </div>
  );
}

export default Sobre;
