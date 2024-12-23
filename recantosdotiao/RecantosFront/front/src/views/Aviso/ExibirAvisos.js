import React from "react";


const ExibirAvisos = ({ avisos, onEdit, onDelete, user }) => {
    // const {user} = useContext(AuthContext)
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Avisos</h2>
            <ul className="list-group">
                {avisos.map((aviso) => (
                    <li
                        key={aviso.id}
                        className="list-group-item"
                    >
                        <div className="row align-items-center">
                           
                            <div className="col-8">
                                <strong>{aviso.texto}</strong>
                                <span> (Criado em: {aviso.data})</span>
                            </div>
                           
                            {user.role=== "Sindico" && (
                                <div className="col-4 text-end">
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => onEdit(aviso)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onDelete(aviso.id)}
                                    >
                                        Apagar
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExibirAvisos;
