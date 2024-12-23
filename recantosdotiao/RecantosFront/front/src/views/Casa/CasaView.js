import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import CadastrarCasa from "./CadastrarCasa";
import EditCasa from "./EditCasa";
import ExibirCasa from "./ExibirCasa";
import { fetchCasas, adicionarCasa, atualizarCasa, deletarCasa } from "../../service/CasaService";

const CasaView = () => {
    const [casas, setCasas] = useState([]);
    const [editar, setEditar] = useState(null);

    useEffect(() => {
        carregarCasas();
    }, []);

    const carregarCasas = async () => {
        const data = await fetchCasas();
        if (data) setCasas(data);
    };

    const cadastrarCasa = async (novaCasa) => {
        const sucesso = await adicionarCasa(novaCasa);
        if (sucesso) carregarCasas();
    };

    const editarCasa = async (casaAtualizada) => {
        const sucesso = await atualizarCasa(casaAtualizada);
        if (sucesso) {
            carregarCasas();
            setEditar(null);
        }
    };

    const apagarCasa = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar esta casa?")) {
            const sucesso = await deletarCasa(id);
            if (sucesso) carregarCasas();
        }
    };

    return (
        <div>
            <Navbar />
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-5">Gerenciar Casas</h1>
                <p className="text-muted">Adicione, edite e visualize as casas cadastradas.</p>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center">
                            {editar ? "Editar Casa" : "Cadastrar Nova Casa"}
                        </div>
                        <div className="card-body">
                            {editar ? (
                                <EditCasa casa={editar} onSave={editarCasa} onCancel={() => setEditar(null)} />
                            ) : (
                                <CadastrarCasa onAdd={cadastrarCasa} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white text-center">
                            Lista de Casas
                        </div>
                        <div className="card-body">
                            <ExibirCasa casas={casas} onEdit={(casa) => setEditar(casa)} onDelete={apagarCasa} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CasaView;
