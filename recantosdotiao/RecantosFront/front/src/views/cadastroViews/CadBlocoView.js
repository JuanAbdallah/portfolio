import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const CadBlocoView = () => {
    const [blocos, setBlocos] = useState([]);
    const [novoBloco, setNovoBloco] = useState("");
    const [editando, setEditando] = useState(null);

    const api_url = "http://localhost:5269/blocos"; 

    useEffect(() => {
        fetchBlocos();
    }, []);

    const fetchBlocos = async () => {
        try {
            const response = await fetch(api_url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar blocos");
            }

            const data = await response.json();
            setBlocos(data);
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const adicionarBloco = async () => {
        if (!novoBloco.trim()) return;

        try {
            const response = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: novoBloco }),
                credentials: "include", 
            });

            if (response.ok) {
                fetchBlocos();
                setNovoBloco("");
            }
        } catch (error) {
            console.error("Erro ao adicionar bloco:", error);
        }
    };

    const atualizarBloco = async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: editando.nome }),
                credentials: "include", 
            });

            if (response.ok) {
                fetchBlocos();
                setEditando(null);
            }
        } catch (error) {
            console.error("Erro ao atualizar bloco:", error);
        }
    };

    const excluirBloco = async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
            });

            if (response.ok) {
                fetchBlocos();
            }
        } catch (error) {
            console.error("Erro ao excluir bloco:", error);
        }
    };

    return (
        <div className="container mt-5">
            <Navbar />
            <h2 className="text-center mb-4">Gerenciar Blocos</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nome do Bloco"
                    value={novoBloco}
                    onChange={(e) => setNovoBloco(e.target.value)}
                />
                <button className="btn btn-primary" onClick={adicionarBloco}>
                    Adicionar Bloco
                </button>
            </div>
            <ul className="list-group">
                {blocos.map((bloco) => (
                    <li
                        key={bloco.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {editando?.id === bloco.id ? (
                            <div className="d-flex w-100">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={editando.nome}
                                    onChange={(e) =>
                                        setEditando({ ...editando, nome: e.target.value })
                                    }
                                />
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => atualizarBloco(bloco.id)}
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
                        ) : (
                            <>
                                <span>{bloco.nome}</span>
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => setEditando(bloco)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => excluirBloco(bloco.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CadBlocoView;
