import React, { useEffect, useState } from "react";
import ComentariosService from "../Services/ComentariosService";
import "./ComentariosContainer.css";
import { FaStar } from "react-icons/fa";

function ComentariosContainer({ filme }) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // form
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [avaliacao, setAvaliacao] = useState(8);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const list = await ComentariosService.fetchByFilmeId(filme.id);
        if (!mounted) return;
        setComentarios(list || []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Erro ao carregar comentários");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (filme && filme.id) load();
    return () => (mounted = false);
  }, [filme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!autor || !texto) return;
    setSubmitting(true);
    try {
      const updated = await ComentariosService.addComment({
        idFilme: filme.id,
        autor,
        texto,
        avaliacao,
        avatar_foto: null,
      });
      setComentarios(updated || []);
      setAutor("");
      setTexto("");
      setAvaliacao(8);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao enviar comentário");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="comentario-container">Carregando comentários...</div>;
  if (error) return <div className="comentario-container">{error}</div>;

  return (
    <div className="comentario-container">
      <div className="comentarios-list">
        {comentarios.length === 0 && <div>Seja o primeiro a comentar!</div>}

        {comentarios.map((comentario, idx) => (
          <div className="comentario" key={idx}>
            <div className="comentario-header">
              <strong>{comentario.autor}</strong>
            </div>

            <p className="comentario-texto">{comentario.texto}</p>

            <span className="comentario-data">{comentario.data_comentario}</span>

            <div className="estrelas">
              <FaStar className="estrela" />
              <span className="avaliacao-num">{comentario.avaliacao}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="comentario-form">
        <h4>Deixe um comentário</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Seu nome"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
          <select value={avaliacao} onChange={(e) => setAvaliacao(Number(e.target.value))}>
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <textarea
            placeholder="Escreva seu comentário..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
          <button type="submit" disabled={submitting}>{submitting ? 'Enviando...' : 'Enviar comentário'}</button>
        </form>
      </div>
    </div>
  );
}

export default ComentariosContainer;
