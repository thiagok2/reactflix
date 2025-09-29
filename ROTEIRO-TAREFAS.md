1. Criar pasta Services, e criou o mock(fixo/fake) e as classes de serviço;

Ex.:

```js
 {
    id: 1,
    titulo: "Stranger Things",
    slug:"stranger-things",
    fotoThumbnail: "../Imagens/Stranger-Things-NI.jpg",
    ano_lancamento: 2016,
    tipo: "s",
    temporadas: 3,
    genero: "Ficção Científica, Terror",
    elenco: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
    duracao: "50min",
    nota_avaliacao: 8.7,
    numero_comentarios: 15230,
    faixa_etaria:"14", 
    indicacoes_premios: ["Emmy", "Globo de Ouro"],
    sinopse: "Em uma pequena cidade, um grupo de amigos se envolve em uma série de eventos sobrenaturais quando um garoto desaparece. Eles acabam descobrindo uma misteriosa menina com poderes telecinéticos e revelam experimentos secretos do governo, portais para outras dimensões e monstros aterrorizantes."
  },
```

2. ProfilePage:


Criar usuários mock:
 ```js
 export const usuarios = [
  {
    id: 1,
    nomeCompleto: "Ana Beatriz Souza",
    email: "ana.souza@example.com",
    idade: 25,
    apelidoName: "Bia",
    avatarImage: "https://i.pinimg.com/564x/b2/a0/29/b2a029a6c2757e9d3a09265e3d07d49d.jpg"
  },
  {
    id: 2,
    nomeCompleto: "Bruno Oliveira Costa",
    email: "bruno.costa@example.com",
    idade: 32,
    apelidoName: "Bruninho",
    avatarImage: "https://i.pinimg.com/564x/b2/a0/29/b2a029a6c2757e9d3a09265e3d07d49d.jpg"
  },
  {
    id: 3,
    nomeCompleto: "Carla Dias Martins",
    email: "carla.martins@example.com",
    idade: 19,
    apelidoName: "Cacá",
    avatarImage: "https://i.pinimg.com/474x/c0/8e/6c/c08e6c9595e03202a46a95f66578799f.jpg"
  },
  {
    id: 4,
    nomeCompleto: "Daniel Almeida",
    email: "daniel.almeida@example.com",
    idade: 45,
    apelidoName: "Dani",
    avatarImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7DAUxmpoOjffahuqaSfqvc3w6Pa1kJjKeOA&s"
  },
 ```

Importar usuarios

```js
import { usuarios }  from "../Services/UsuarioMock";
```

Retornar lista de usuários

```
 return(
   <div className="App">
    
      <SelecaoPerfil listaDeUsuarios={usuarios} /> 
    </div>
 )
```

3. Mover pasta Imagens de src para public


4.Atualizar HomePage