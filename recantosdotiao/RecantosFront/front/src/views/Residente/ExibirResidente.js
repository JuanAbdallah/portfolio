import React from "react";

const ExibirResidentes = ({ residentes, onEdit, onDelete }) => {
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Residentes</h2>
            <ul className="list-group">
                {residentes.map((residente) => (
                    <li
                        key={residente.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>Nome:</strong> {residente.nome} - 
                            <strong> Casa:</strong> {residente.casaId} - 
                            <strong> CPF:</strong> {residente.cpf}
                        </div>
                        <div>
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => onEdit(residente)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(residente.id)}
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

export default ExibirResidentes;
