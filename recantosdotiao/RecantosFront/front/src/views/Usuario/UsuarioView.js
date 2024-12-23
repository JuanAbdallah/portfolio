import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { adicionarUsuario, atualizarUsuario, deletarUsuario, fetchUsuarios } from "../../service/UsuarioService";
import EditUsuario from "./EditarUsuario";
import CadastrarUsuario from "./CadastroUsuario";
import ExibirUsuarios from "./ExibirUsuarios";


const UsuarioView = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editar, setEditar] = useState(null);

    useEffect(() => {
        carregarUsuarios();
    }, [usuarios]);

    const carregarUsuarios = async () => {
        const data = await fetchUsuarios();
        if (data) setUsuarios(data);
    };

    const cadastrarUsuario = async (novoUsuario) => {
        try {
            const response = await adicionarUsuario(novoUsuario);

            if (response) {
                alert("Usuario cadastrado com sucesso!");
            } else {                
                alert("Erro ao cadastrar Usuario.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }

    
    };

    const editarUsuario = async (usuarioAtualizado) => {
        
        const sucesso = await atualizarUsuario(usuarioAtualizado);
        if (sucesso) {
            carregarUsuarios();
            setEditar(null);
        }
    };

    const apagarUsuario = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar este usuário?")) {
            const sucesso = await deletarUsuario(id);
            if (sucesso) carregarUsuarios();
        }
    };

    return (
        <div>
            <Navbar />
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-5">Gerenciar Usuários</h1>
                <p className="text-muted">Adicione, edite e visualize os usuarios cadastrados.</p>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center">
                            {editar ? "Editar Residente" : "Cadastrar Novo Residente"}
                        </div>
                        <div className="card-body">
                            {editar ? (
                                <EditUsuario usuario={editar} onSave={editarUsuario} onCancel={() => setEditar(null)} />
                            ) : (
                                <CadastrarUsuario onAdd={cadastrarUsuario}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white text-center">
                            Lista de Usuários
                        </div>
                        <div className="card-body">
                            <ExibirUsuarios usuarios={usuarios} onEdit={(usuario) => setEditar(usuario)} onDelete={apagarUsuario} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default UsuarioView;
