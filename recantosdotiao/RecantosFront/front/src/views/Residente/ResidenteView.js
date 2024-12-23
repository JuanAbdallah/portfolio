import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import CadastrarResidente from "./CadastrarResidente";
import EditResidente from "./EditResidente";
import ExibirResidente from "./ExibirResidente";
import { fetchResidentes, atualizarResidente, deletarResidente } from "../../service/ResidenteService";

const ResidenteView = () => {
    const [residentes, setResidentes] = useState([]);
    const [editar, setEditar] = useState(null);

    useEffect(() => {
        carregarResidentes();
    }, [residentes]);

    const carregarResidentes = async () => {
        const data = await fetchResidentes();
        if (data) setResidentes(data);
    };


    const editarResidente = async (residenteAtualizado) => {
        const sucesso = await atualizarResidente(residenteAtualizado);
        if (sucesso) {
            carregarResidentes();
            setEditar(null);
        }
    };

    const apagarResidente = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar este residente?")) {
            const sucesso = await deletarResidente(id);
            if (sucesso) carregarResidentes();
        }
    };

    return (
        <div>
            <Navbar />
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-5">Gerenciar Residentes</h1>
                <p className="text-muted">Adicione, edite e visualize os residentes cadastrados.</p>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center">
                            {editar ? "Editar Residente" : "Cadastrar Novo Residente"}
                        </div>
                        <div className="card-body">
                            {editar ? (
                                <EditResidente residente={editar} onSave={editarResidente} onCancel={() => setEditar(null)} />
                            ) : (
                                <CadastrarResidente />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white text-center">
                            Lista de Residentes
                        </div>
                        <div className="card-body">
                            <ExibirResidente residentes={residentes} onEdit={(residente) => setEditar(residente)} onDelete={apagarResidente} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ResidenteView;
