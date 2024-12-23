import React, { useState, useEffect } from "react";
import { buscarCasaPorId } from "../../service/CasaService";

const ExibirUsuarios = ({ usuarios, onEdit, onDelete }) => {
    const [casas, setCasas] = useState({}); 

    const fetchNumeroCasa = async (casaId) => {
        if (!casas[casaId]) {
            const casa = await buscarCasaPorId(casaId);
            setCasas((prevCasas) => ({ ...prevCasas, [casaId]: casa.numero }));
        }
    };

    useEffect(() => {
        usuarios.forEach((usuario) => {
            fetchNumeroCasa(usuario.casaId);
        });
        
    }, [usuarios]); 

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Usuários</h2>
            <ul className="list-group">
                {usuarios.map((usuario) => (
                    <li
                        key={usuario.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>Login:</strong> {usuario.login} -
                            <strong> Role:</strong> {usuario.role} -
                            <strong> Casa:</strong> {casas[usuario.casaId] || "Carregando..."}
                        </div>
                        <div>
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => onEdit(usuario)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(usuario.id)}
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

export default ExibirUsuarios;
