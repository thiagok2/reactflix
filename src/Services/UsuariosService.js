import FilmesServiceApi from "./FilmesServiceApi";

// 🔹 Função para pegar filmes aleatórios da API do TMDb
export async function getFilmesAleatorios(qtd = 6) {
  try {
    // 🔸 Carrega filmes populares e mais votados da API
    const [populares, topRated] = await Promise.all([
      FilmesServiceApi.getPopularMovies(),
      FilmesServiceApi.getTopRatedMovies(),
    ]);

    // 🔸 Combina todos os filmes e embaralha
    const todosFilmes = [...populares, ...topRated];
    const filmesAleatorios = todosFilmes
      .sort(() => Math.random() - 0.5)
      .slice(0, qtd);

    return filmesAleatorios;
  } catch (error) {
    console.error("❌ Erro ao buscar filmes aleatórios:", error);
    return [];
  }
}

// 🔹 Gerar uma “playlist” aleatória (pode simular uma do usuário)
export async function gerarPlaylistAleatoria(idUsuario, qtd = 6) {
  try {
    const filmes = await getFilmesAleatorios(qtd);

    // (Simulação de salvar playlist — você pode conectar com o backend se quiser)
    const playlist = {
      idUsuario,
      criadaEm: new Date().toISOString(),
      filmes,
    };

    console.log("📀 Playlist gerada:", playlist);
    return playlist;
  } catch (error) {
    console.error("❌ Erro ao gerar playlist aleatória:", error);
    return null;
  }
}
