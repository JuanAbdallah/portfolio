import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { adicionarBloco, atualizarBloco, deletarBloco, fetchBlocos } from "../../service/BlocoService";
import CadastrarBloco from "./CadastroBloco";
import EditarBloco from "./EditarBloco";
import ExibirBlocos from "./ExibirBlocos";

const BlocoView = () => {
    const [blocos, setBlocos] = useState([]);
    const [editar, setEditar] = useState(null);

    useEffect(() => {
        carregarBlocos();
    }, []);

    const carregarBlocos = async () => {
        const data = await fetchBlocos();
        if (data) setBlocos(data);
    };

    const cadastrarBloco = async (novoBloco) => {
        const sucesso = await adicionarBloco(novoBloco);
        if (sucesso) carregarBlocos();
    };

    const editarBloco = async (blocoAtualizado) => {
        const sucesso = await atualizarBloco(blocoAtualizado);
        if (sucesso) {
            carregarBlocos();
            setEditar(null);
        }
    };

    const apagarBloco = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar este bloco?")) {
            const sucesso = await deletarBloco(id);
            if (sucesso) carregarBlocos();
        }
    };

    return (
        <div>
            <Navbar />
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-5">Gerenciar Blocos</h1>
                <p className="text-muted">Adicione, edite e visualize os blocos cadastrados.</p>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center">
                            {editar ? "Editar Bloco" : "Cadastrar Novo Bloco"}
                        </div>
                        <div className="card-body">
                            {editar ? (
                                <EditarBloco bloco={editar} onSave={editarBloco} onCancel={() => setEditar(null)} />
                            ) : (
                                <CadastrarBloco onAdd={cadastrarBloco} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white text-center">
                            Lista de Blocos
                        </div>
                        <div className="card-body">
                            <ExibirBlocos blocos={blocos} onEdit={(bloco) => setEditar(bloco)} onDelete={apagarBloco} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default BlocoView;
