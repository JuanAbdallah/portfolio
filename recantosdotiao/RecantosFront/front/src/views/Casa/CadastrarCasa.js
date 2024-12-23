import React, { useState, useEffect } from "react";
import { fetchBlocos } from "../../service/BlocoService";

const CadastrarCasa = ({ onAdd }) => {
    const [novaCasa, setNovaCasa] = useState({ numero: "", blocoId: "" });
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

    const enviar = () => {
        if (!novaCasa.numero.trim() || !novaCasa.blocoId.trim()) {
            setErro("Por favor, preencha todos os campos!");
            return;
        }
        setErro("");
        onAdd(novaCasa);
        setNovaCasa({ numero: "", blocoId: "" });
    };

    return (
        <div className="container mt-3">
            <h2 className="text-center">Cadastrar Casa</h2>
            <p className="text-muted text-center mb-4">
                Preencha os campos abaixo para adicionar uma nova casa.
            </p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="numeroCasa" className="form-label">
                            Número da Casa
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="numeroCasa"
                            placeholder="Digite o número da casa"
                            value={novaCasa.numero}
                            onChange={(e) =>
                                setNovaCasa({ ...novaCasa, numero: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="idBloco" className="form-label">
                            Bloco
                        </label>
                        <select
                            className="form-control"
                            id="idBloco"
                            value={novaCasa.blocoId}
                            onChange={(e) =>
                                setNovaCasa({ ...novaCasa, blocoId: e.target.value })
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
                        <button className="btn btn-primary" onClick={enviar}>
                            Cadastrar Casa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastrarCasa;
