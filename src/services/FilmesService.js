
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