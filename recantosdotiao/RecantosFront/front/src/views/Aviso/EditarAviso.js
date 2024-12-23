import React, { useState } from "react";

const EditarAviso = ({ aviso, onSave, onCancel }) => {
    const [editando, setEditando] = useState({ ...aviso });
    const [erro, setErro] = useState("");

    const Salvar = () => {
        if (!editando.texto.trim() || !editando.data.trim()) {
            setErro("Preencha todos os campos!");
            return;
        }
        setErro("");
        onSave(editando);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Editar Aviso</h2>
            <p className="text-muted text-center mb-4">Modifique as informações abaixo e clique em "Salvar".</p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="texto" className="form-label">Texto do Aviso</label>
                        <input
                            type="text"
                            className="form-control"
                            id="texto"
                            value={editando.texto}
                            onChange={(e) => setEditando({ ...editando, texto: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="data" className="form-label">Data</label>
                        <input
                            type="date"
                            className="form-control"
                            id="data"
                            value={editando.data}
                            onChange={(e) => setEditando({ ...editando, data: e.target.value })}
                        />
                    </div>
                    {erro && (
                        <div className="alert alert-danger text-center" role="alert">
                            {erro}
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-success me-2" onClick={Salvar}>Salvar</button>
                        <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarAviso;
