import React, { useState } from "react";

const CadastrarAviso = ({ onAdd }) => {
    const [novoAviso, setNovoAviso] = useState({ texto: "" });
    const [erro, setErro] = useState("");

    const Submit = () => {
        if (!novoAviso.texto.trim()) {
            setErro("Preencha todos os campos!");
            return;
        }
        setErro("");
        onAdd(novoAviso);
        setNovoAviso({ texto: ""});
    };

    return (
        <div className="container mt-3">
            <h2 className="text-center">Cadastrar Aviso</h2>
            <p className="text-muted text-center mb-4">
                Preencha os campos abaixo para cadastrar um novo aviso no sistema.
            </p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="texto" className="form-label">Texto do Aviso</label>
                        <textarea
                            className="form-control"
                            id="texto"
                            placeholder="Digite o texto do aviso"
                            value={novoAviso.texto}
                            onChange={(e) => setNovoAviso({ ...novoAviso, texto: e.target.value })}
                            rows="5" // Define o número de linhas do textarea
                            style={{ resize: "none" }} // Remove a opção de redimensionar o textarea
                        />
                    </div>
                    {erro && (
                        <div className="alert alert-danger text-center" role="alert">
                            {erro}
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={Submit}>Cadastrar Aviso</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastrarAviso;
