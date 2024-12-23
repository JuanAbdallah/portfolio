import React from "react";

const ExibirCasa = ({ casas, onEdit, onDelete }) => {
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Casas</h2>
            <ul className="list-group">
                {casas.map((casa) => (
                    <li
                        key={casa.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>Casa:</strong> {casa.numero} - 
                            <strong> Bloco:</strong> {casa.blocoNome}
                        </div>
                        <div>
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => onEdit(casa)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(casa.id)}
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

export default ExibirCasa;
