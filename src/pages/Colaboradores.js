import "./Colaboradores.css";
import Ad from "../Imagens/adonai.jpg";
import Dri from "../Imagens/adriely.png";
import Aly from "../Imagens/alycia.jpg";
import Ca from "../Imagens/carol.png";
import Lu from "../Imagens/luiza.jpg";
import Nel from "../Imagens/nelly.jpg";
import Beto from "../Imagens/claudio.png";
import Duda from "../Imagens/Eduardo.png";
import Eli from "../Imagens/elijamerson.png";
import Emi from "../Imagens/emillyg.png";
import Es from "../Imagens/EmillyS.png";
import Gab from "../Imagens/gabriel1.png";
import Rond from "../Imagens/rondonia.png";
import Givs from "../Imagens/Givanildo.png";
import Gui from "../Imagens/guilherme.png";
import Ira from "../Imagens/iran.png";
import Lau from "../Imagens/Laura.jpg";
import Liv from "../Imagens/livia.jpg";
import Ka from "../Imagens/karol.jpg";
import Ma from "../Imagens/mari.png";
import Theu from "../Imagens/matheus.png";
import Mig from "../Imagens/Miguel.png";
import Ran from "../Imagens/ranny.png";
import Thi from "../Imagens/thiago.png";
import Gus from "../Imagens/gustavo.png";
import Wal from "../Imagens/wal.png";

function Colaboradores() {

  const colaboradores = [
    { nome: "Adonai Roberto", cargo: "Colaborador", foto: Ad },
    { nome: "Adriely", cargo: "Colaboradora", foto: Dri },
    { nome: "Alycia", cargo: "Colaboradora", foto: Aly },
    { nome: "Carol", cargo: "Colaboradora", foto: Ca },
    { nome: "Luiza", cargo: "Colaboradora", foto: Lu },
    { nome: "Nelly", cargo: "Colaboradora", foto: Nel },
    { nome: "Cláudio", cargo: "Colaborador", foto: Beto },
    { nome: "Eduardo", cargo: "Colaborador", foto: Duda },
    { nome: "Elijamerson", cargo: "Colaborador", foto: Eli },
    { nome: "Emilly G.", cargo: "Colaboradora", foto: Emi },
    { nome: "Emilly S.", cargo: "Colaboradora", foto: Es },
    { nome: "Gabriel", cargo: "Colaborador", foto: Gab },
    { nome: "Givanildo", cargo: "Colaborador", foto: Givs },
    { nome: "Guilherme", cargo: "Colaborador", foto: Gui },
    { nome: "Iran", cargo: "Colaborador", foto: Ira },
    { nome: "Laura", cargo: "Colaboradora", foto: Lau },
    { nome: "Lívia", cargo: "Colaboradora", foto: Liv },
    { nome: "Karol", cargo: "Colaboradora", foto: Ka },
    { nome: "Mari", cargo: "Colaboradora", foto: Ma },
    { nome: "Matheus", cargo: "Colaborador", foto: Theu },
    { nome: "Miguel", cargo: "Colaborador", foto: Mig },
    { nome: "Ranny", cargo: "Colaboradora", foto: Ran },
    { nome: "Rondônia", cargo: "Colaborador", foto: Rond },
    { nome: "Thiago", cargo: "Colaborador", foto: Thi },
    { nome: "Gustavo", cargo: "Colaborador", foto: Gus },
    { nome: "Wal", cargo: "Colaboradora", foto: Wal },
  ];

  return (
    <div className="colab-pai">
      <h1 className="colab-titulo">Nossos Colaboradores</h1>
      <div className="colab-grid">
        {colaboradores.map((pessoa, index) => (
          <div key={index} className="colab-card">
            <img src={pessoa.foto} alt={pessoa.nome} className="colab-foto" />
            <h3 className="colab-nome">{pessoa.nome}</h3>
            <p className="colab-cargo">{pessoa.cargo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Colaboradores;
