import React, { useState, useEffect } from "react";
import { fetchBlocos } from "../../service/BlocoService"; 

const EditCasa = ({ casa, onSave, onCancel }) => {
    const [editandoCasa, setEditandoCasa] = useState({ ...casa });
    const [blocos, setBlocos] = useState([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarBlocos = async () => {
            try {
                const blocosData = await fetchBlocos();
                setBlocos(blocosData);
            } catch (error) {
                console.error("Erro ao carregar blocos:", error);
                setErro("Não foi possível carregar os blocos.");
            }
        };

        carregarBlocos();
    }, []);

    const salvar = (e) => {
        e.preventDefault();
        if (!editandoCasa.numero || !editandoCasa.blocoId.trim()) {
            setErro("Por favor, preencha todos os campos!");
            return;
        }
        setErro("");
        onSave(editandoCasa);
    };

    return (
        <div className="container mt-3">
            <h2 className="text-center">Editar Casa</h2>
            <p className="text-muted text-center mb-4">
                Atualize os dados da casa abaixo e clique em "Salvar".
            </p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="numeroCasa" className="form-label">
                            Número da Casa
                        </label>
                        <input
                            type="text"
                            id="numeroCasa"
                            className="form-control"
                            placeholder="Digite o número da casa"
                            value={editandoCasa.numero}
                            onChange={(e) =>
                                setEditandoCasa({ ...editandoCasa, numero: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="idBloco" className="form-label">
                            Bloco
                        </label>
                        <select
                            id="idBloco"
                            className="form-control"
                            value={editandoCasa.blocoId}
                            onChange={(e) =>
                                setEditandoCasa({ ...editandoCasa, blocoId: e.target.value })
                            }
                        >
                            <option value="">Selecione um bloco</option>
                            {blocos.map((bloco) => (
                                <option key={bloco.id} value={bloco.id}>
                                    {bloco.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {erro && (
                        <div className="alert alert-danger text-center" role="alert">
                            {erro}
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-success me-2" onClick={salvar}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCasa;
