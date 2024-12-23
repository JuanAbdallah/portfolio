import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

const CadAvisoView = () => {
    const [avisos, setAvisos] = useState([]);
    const [novoAviso, setNovoAviso] = useState({ texto: '', dataExpiracao: '' });
    const [editando, setEditando] = useState(null);

    const api_url = 'http://localhost:5269/avisos';

    useEffect(() => {
        fetchAvisos();
    }, []);

    const fetchAvisos = async () => {
        const response = await fetch(api_url, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        setAvisos(data);
    };

    const adicionarAviso = async () => {
        if (!novoAviso.texto.trim() || !novoAviso.dataExpiracao.trim()) return;
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(novoAviso),
        });
        if (response.ok) {
            fetchAvisos();
            setNovoAviso({ texto: '', dataExpiracao: '' });
        }
    };

    const atualizarAviso = async (id) => {
        const response = await fetch(`${api_url}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(editando),
        });
        if (response.ok) {
            fetchAvisos();
            setEditando(null);
        }
    };

    const excluirAviso = async (id) => {
        const response = await fetch(`${api_url}/${id}`, { 
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (response.ok) fetchAvisos();
    };

    return (
        <div className="container my-4">
            <Navbar />
            <h2 className="text-center mb-4">Gerenciar Avisos</h2>
            <div className="card p-4 mb-4">
                <div className="row g-2">
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Texto do Aviso"
                            value={novoAviso.texto}
                            onChange={(e) => setNovoAviso({ ...novoAviso, texto: e.target.value })}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="date"
                            className="form-control"
                            value={novoAviso.dataExpiracao}
                            onChange={(e) => setNovoAviso({ ...novoAviso, dataExpiracao: e.target.value })}
                        />
                    </div>
                </div>
                <div className="text-end mt-3">
                    <button className="btn btn-primary" onClick={adicionarAviso}>
                        Adicionar Aviso
                    </button>
                </div>
            </div>
            <ul className="list-group">
                {avisos.map((aviso) => (
                    <li key={aviso.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editando?.id === aviso.id ? (
                            <div className="row w-100">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editando.texto}
                                        onChange={(e) => setEditando({ ...editando, texto: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={editando.dataExpiracao}
                                        onChange={(e) => setEditando({ ...editando, dataExpiracao: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-2 text-end">
                                    <button className="btn btn-success me-2" onClick={() => atualizarAviso(aviso.id)}>
                                        Salvar
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => setEditando(null)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span>
                                    <strong>{aviso.texto}</strong> - Expira em {aviso.dataExpiracao}
                                </span>
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => setEditando(aviso)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => excluirAviso(aviso.id)}
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

export default CadAvisoView;
