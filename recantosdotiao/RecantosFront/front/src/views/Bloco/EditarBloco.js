import React, { useState } from "react";

const EditarBloco = ({ bloco, onSave, onCancel }) => {
    const [editando, setEditando] = useState({ ...bloco });
    const [erro, setErro] = useState("");

    const Salvar = () => {
        if (!editando.nome.trim()) {
            setErro("Por favor, preencha o nome do blooo!");
            return;
        }
        setErro(""); 
        onSave(editando);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Editar Bloco</h2>
            <p className="text-muted text-center mb-4">
                Modifique as informações abaixo e clique em "Salvar" para confirmar as alterações.
            </p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                            Nome do bloco
                        </label>
                        <input
                            type="text"
                            id="nome"
                            className="form-control"
                            placeholder="Número do bloco"
                            value={editando.nome}
                            onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
                        />
                    </div>
                    {erro && (
                        <div className="alert alert-danger text-center" role="alert">
                            {erro}
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-success me-2" onClick={Salvar}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarBloco;
