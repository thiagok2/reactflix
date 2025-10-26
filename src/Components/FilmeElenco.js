import "./FilmeElenco.css"

function FilmeElenco({ filme }) {
    const elenco = filme?.elenco ?? [];

    return (
        <div className="atores">
            <h3 className="titulo-elenco">Elenco:</h3>
            {elenco.length === 0 && <div className="ator">Sem informações de elenco.</div>}
            {elenco.map((ator, idx) => (
                <div className="ator" key={idx}>
                    {ator}
                </div>
            ))}
        </div>
    );
}

export default FilmeElenco;
