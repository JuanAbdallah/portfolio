import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { fetchAvisos, adicionarAviso, atualizarAviso, deletarAviso } from "../../service/AvisoService";
import CadastrarAviso from "./CadastrarAviso";
import EditarAviso from "./EditarAviso";
import ExibirAvisos from "./ExibirAvisos";
import { AuthContext } from "../../context/auth";

const AvisoView = () => {
    const [avisos, setAvisos] = useState([]);
    const [editar, setEditar] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        carregarAvisos();
    }, []);

    const carregarAvisos = async () => {
        const data = await fetchAvisos();
        if (data) setAvisos(data);
    };

    const cadastrarAviso = async (novoAviso) => {
        const sucesso = await adicionarAviso(novoAviso);
        if (sucesso) carregarAvisos();
    };

    const editarAviso = async (avisoAtualizado) => {
        const sucesso = await atualizarAviso(avisoAtualizado);
        if (sucesso) {
            carregarAvisos();
            setEditar(null);
        }
    };

    const apagarAviso = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar este aviso?")) {
            const sucesso = await deletarAviso(id);
            if (sucesso) carregarAvisos();
        }
    };

    return (
        <div>
            <Navbar />
        <div className="container mt-5">

            {user && user.role === "Sindico" && (
                <div className="text-center mb-4">
                    <h1 className="display-5">Gerenciar Avisos</h1>
                    <p className="text-muted">Adicione, edite e visualize os avisos cadastrados.</p>
                </div>
            )}
            <div className="row">
                {user && user.role === "Sindico" && (
                    <div className="col-lg-4 col-md-12 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white text-center">
                                {editar ? "Editar Aviso" : "Cadastrar Novo Aviso"}
                            </div>
                            <div className="card-body">
                                {editar ? (
                                    <EditarAviso aviso={editar} onSave={editarAviso} onCancel={() => setEditar(null)}/>
                                ) : (
                                    <CadastrarAviso onAdd={cadastrarAviso} />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-lg-8 col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white text-center">
                            Lista de Avisos
                        </div>
                        <div className="card-body">
                            <ExibirAvisos avisos={avisos} onEdit={(aviso) => setEditar(aviso)} onDelete={apagarAviso} user= {user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AvisoView;
