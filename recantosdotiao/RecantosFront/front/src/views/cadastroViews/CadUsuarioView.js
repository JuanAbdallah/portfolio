import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const CadUsuarioView = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [novoUsuario, setNovoUsuario] = useState({ login: "", senha: "", idCasa: "" });
    const [modoEdicao, setModoEdicao] = useState(null);
    const api_url = "http://localhost:5269";

    const fetchUsuarios = async () => {
        try {
            const response = await fetch(`${api_url}/usuarios`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            } else {
                console.error("Erro ao buscar usuários:", response.status);
            }
        } catch (error) {
            console.error("Erro na conexão com o servidor:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const adicionarUsuario = async () => {
        if (!novoUsuario.login.trim() || !novoUsuario.senha.trim() || !novoUsuario.idCasa.trim()) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await fetch(`${api_url}/usuarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(novoUsuario),
            });

            if (response.ok) {
                const usuarioCriado = await response.json();
                setUsuarios([...usuarios, usuarioCriado]);
                setNovoUsuario({ login: "", senha: "", idCasa: "" });
            } else if (response.status === 409) {
                alert("Já existe um usuário com este login.");
            } else {
                alert("Erro ao adicionar usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }
    };

    const iniciarEdicao = (usuario) => {
        setModoEdicao(usuario);
        setNovoUsuario(usuario);
    };

    const atualizarUsuario = async () => {
        try {
            console.log("MODO EDICAO: " + modoEdicao.id);
            
            const response = await fetch(`${api_url}/usuario/${modoEdicao.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(novoUsuario),
            });

            if (response.ok) {
                setUsuarios(
                    usuarios.map((usuario) =>
                        usuario.id === modoEdicao.id ? { ...usuario, ...novoUsuario } : usuario
                    )
                );
                setModoEdicao(null);
                setNovoUsuario({ login: "", senha: "", idCasa: "" });
            } else {
                alert("Erro ao atualizar o usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }
    };

    const excluirUsuario = async (id) => {
        try {
            const response = await fetch(`${api_url}/usuario/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
            } else {
                alert("Erro ao excluir o usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }
    };

    return (
        <div className="container mt-4">
            <Navbar />
            <h2>Cadastro de Usuário</h2>
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Login"
                        value={novoUsuario.login}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, login: e.target.value })}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Senha"
                        value={novoUsuario.senha}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ID Casa"
                        value={novoUsuario.idCasa}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, idCasa: e.target.value })}
                    />
                </div>
            </div>
            <button
                className={`btn ${modoEdicao ? "btn-warning" : "btn-primary"} mb-3`}
                onClick={modoEdicao ? atualizarUsuario : adicionarUsuario}
            >
                {modoEdicao ? "Atualizar Usuário" : "Adicionar Usuário"}
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Login</th>
                        <th>Casa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.login}</td>
                            <td>{usuario.idCasa}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-success me-2"
                                    onClick={() => iniciarEdicao(usuario)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => excluirUsuario(usuario.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CadUsuarioView;
