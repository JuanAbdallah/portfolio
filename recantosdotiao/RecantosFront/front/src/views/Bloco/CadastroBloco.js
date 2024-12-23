import React, { useState } from "react";

const CadastrarBloco = ({ onAdd }) => {
    const [novoBloco, setNovoBloco] = useState({ nome: ""});
    const [erro, setErro] = useState("");

    const Enviar = () => {
        if (!novoBloco.nome.trim()) {
            setErro("Por favor, preencha o nome do bloco!");
            return;
        }
        setErro(""); 
        onAdd(novoBloco);
        setNovoBloco({ nome: ""});
    };

    return (
        <div className="container mt-3">
            <h2 className="text-center">Cadastrar Bloco</h2>
            <p className="text-muted text-center mb-4">Preencha os campos abaixo para cadastrar um novo bloco no sistema.</p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                            Nome do bloco
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            placeholder="Digite o nome do bloco"
                            value={novoBloco.nome}
                            onChange={(e) => setNovoBloco({ ...novoBloco, nome: e.target.value })}
                        />
                    </div>
                    {erro && (
                        <div className="alert alert-danger text-center" role="alert">
                            {erro}
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={Enviar}>
                            Cadastrar Bloco
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastrarBloco;
