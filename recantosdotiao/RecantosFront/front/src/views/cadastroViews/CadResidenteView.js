import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const CadResidenteView = () => {
    const [residentes, setResidentes] = useState([]);
    const [novoResidente, setNovoResidente] = useState({ nome: "", casaId: "" });
    const [editando, setEditando] = useState(null);
    const api_url = "http://localhost:5269/residentes";

    useEffect(() => {
        fetchResidentes();
    }, []);

    const fetchResidentes = async () => {
        try {
            const response = await fetch(api_url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar residentes");
            }

            const data = await response.json();
            setResidentes(data);
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const adicionarResidente = async () => {
        if (!novoResidente.nome.trim() || !novoResidente.casaId.trim()) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoResidente),
                credentials: "include",
            });

            if (response.ok) {
                fetchResidentes();
                setNovoResidente({ nome: "", casaId: "" });
            } else {
                alert("Erro ao adicionar residente.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }
    };

    const atualizarResidente = async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editando),
                credentials: "include",
            });

            if (response.ok) {
                fetchResidentes();
                setEditando(null);
            } else {
                alert("Erro ao atualizar residente.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }
    };

    const excluirResidente = async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                fetchResidentes();
            } else {
                alert("Erro ao excluir residente.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }
    };

    return (
        <div className="container mt-4">
            <Navbar />
            <h2 className="text-center mb-4">Gerenciar Residentes</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nome"
                    value={novoResidente.nome}
                    onChange={(e) =>
                        setNovoResidente({ ...novoResidente, nome: e.target.value })
                    }
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="ID da Casa"
                    value={novoResidente.casaId}
                    onChange={(e) =>
                        setNovoResidente({ ...novoResidente, casaId: e.target.value })
                    }
                />
                <button
                    className="btn btn-primary"
                    onClick={adicionarResidente}
                >
                    Adicionar Residente
                </button>
            </div>
            <ul className="list-group">
                {residentes.map((residente) => (
                    <li
                        key={residente.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {editando?.id === residente.id ? (
                            <div className="d-flex flex-column flex-grow-1">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={editando.nome}
                                    onChange={(e) =>
                                        setEditando({ ...editando, nome: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={editando.casaId}
                                    onChange={(e) =>
                                        setEditando({ ...editando, casaId: e.target.value })
                                    }
                                />
                                <div>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => atualizarResidente(residente.id)}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setEditando(null)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-grow-1">
                                {residente.nome} - Casa {residente.casaId}
                            </div>
                        )}
                        {!editando?.id && (
                            <div>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => setEditando(residente)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => excluirResidente(residente.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CadResidenteView;
