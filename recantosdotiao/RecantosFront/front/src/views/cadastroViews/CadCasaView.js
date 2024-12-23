import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const CadCasaView = () => {
    const [casas, setCasas] = useState([]);
    const [novaCasa, setNovaCasa] = useState({ numero: "", blocoId: "" });
    const [editando, setEditando] = useState(null);

    const api_url = "http://localhost:5269/casas"; 

    useEffect(() => {
        fetchCasas();
    }, []);

    const fetchCasas = async () => {
        try {
            const response = await fetch(api_url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar casas");
            }

            const data = await response.json();
            setCasas(data);
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const adicionarCasa = async () => {
        if (!novaCasa.numero.trim() || !novaCasa.blocoId.trim()) return;

        try {
            const response = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novaCasa),
                credentials: "include", 
            });

            if (response.ok) {
                fetchCasas();
                setNovaCasa({ numero: "", blocoId: "" });
            }
        } catch (error) {
            console.error("Erro ao adicionar casa:", error);
        }
    };

    const atualizarCasa = async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editando),
                credentials: "include", 
            });

            if (response.ok) {
                fetchCasas();
                setEditando(null);
            }
        } catch (error) {
            console.error("Erro ao atualizar casa:", error);
        }
    };

    const excluirCasa = async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
            });

            if (response.ok) {
                fetchCasas();
            }
        } catch (error) {
            console.error("Erro ao excluir casa:", error);
        }
    };

    return (
        <div className="container mt-4">
            <Navbar />
            <h2 className="text-center mb-4">Gerenciar Casas</h2>
            <div className="mb-3 row g-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Número da Casa"
                        value={novaCasa.numero}
                        onChange={(e) => setNovaCasa({ ...novaCasa, numero: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ID do Bloco"
                        value={novaCasa.blocoId}
                        onChange={(e) => setNovaCasa({ ...novaCasa, blocoId: e.target.value })}
                    />
                </div>
                <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={adicionarCasa}>
                        Adicionar Casa
                    </button>
                </div>
            </div>

            <ul className="list-group">
                {casas.map((casa) => (
                    <li key={casa.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editando?.id === casa.id ? (
                            <>
                                <div className="d-flex flex-column flex-md-row">
                                    <input
                                        type="text"
                                        className="form-control me-2 mb-2 mb-md-0"
                                        value={editando.numero}
                                        onChange={(e) =>
                                            setEditando({ ...editando, numero: e.target.value })
                                        }
                                    />
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={editando.blocoId}
                                        onChange={(e) =>
                                            setEditando({ ...editando, blocoId: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => atualizarCasa(casa.id)}
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
                            </>
                        ) : (
                            <>
                                <span>
                                    Casa {casa.numero} - Bloco {casa.blocoId}
                                </span>
                                <div>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => setEditando(casa)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => excluirCasa(casa.id)}
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

export default CadCasaView;
