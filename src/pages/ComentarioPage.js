import React, { useState } from 'react';
import './ComentarioPage.css';
import { FaThumbsUp } from 'react-icons/fa';

function ComentarioPage({ comentarios }) {
    const [curtidas, setCurtidas] = useState({});

    const handleCurtir = (idComentario) => {
        setCurtidas(prev => ({
            ...prev,
            [idComentario]: (prev[idComentario] || 0) + 1
        }));
    };

    return (
        <div className="comentarios-container">
            <h3>Comentários ({comentarios.length})</h3>
            {
                comentarios.map((comentario, idx) => (
                    <div key={idx} className="comentario-item">
                        <p className="comentario-nome">{comentario.nome}</p>
                        <p className="comentario-texto">{comentario.texto}</p>
                        <div className="comentario-footer">
                            <button onClick={() => handleCurtir(idx)} className="curtir-btn">
                                <FaThumbsUp /> {curtidas[idx] || 0}
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ComentarioPage;
