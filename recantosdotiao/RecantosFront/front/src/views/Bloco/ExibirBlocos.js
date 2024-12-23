import React from "react";

const ExibirBlocos = ({ blocos, onEdit, onDelete }) => {
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Blocos</h2>
            <ul className="list-group">
                {blocos.map((bloco) => (
                    <li
                        key={bloco.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>Bloco:</strong> {bloco.nome}
                        </div>
                        <div>
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => onEdit(bloco)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(bloco.id)}
                            >
                                Apagar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExibirBlocos;
