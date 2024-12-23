import React, { useState, useEffect } from "react";
import { fetchCasas } from "../../service/CasaService"; 
import { atualizarResidente } from "../../service/ResidenteService";

const EditResidente = ({ residente, onCancel, onSave }) => {
    const [residenteEditado, setResidenteEditado] = useState({ ...residente });
    const [casas, setCasas] = useState([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarCasas = async () => {
            const casasData = await fetchCasas();
            if (casasData) {
                setCasas(casasData);
            } else {
                alert("Erro ao carregar a lista de casas.");
            }
        };

        carregarCasas();
    }, []);

    const salvar = async (e) => {
        e.preventDefault();
        if (!residenteEditado.nome.trim() || !residenteEditado.casaId.trim() || !residenteEditado.cpf.trim()) {
            setErro("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await atualizarResidente(residenteEditado);

            if (response) {
                alert("Residente atualizado com sucesso!");
                onSave(residenteEditado);
            } else {
                setErro("Erro ao atualizar o residente.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setErro("Erro na conexão com o servidor.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Editar Residente</h2>
            <form onSubmit={salvar}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Nome"
                        value={residenteEditado.nome}
                        onChange={(e) =>
                            setResidenteEditado({ ...residenteEditado, nome: e.target.value })
                        }
                    />
                    <select
                        className="form-control mb-2"
                        value={residenteEditado.casaId}
                        onChange={(e) =>
                            setResidenteEditado({ ...residenteEditado, casaId: e.target.value })
                        }
                    >
                        <option value="">Selecione uma casa</option>
                        {casas.map((casa) => (
                            <option key={casa.id} value={casa.id}>
                                {casa.nome || `Casa ${casa.id}`}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="CPF"
                        value={residenteEditado.cpf}
                        onChange={(e) =>
                            setResidenteEditado({ ...residenteEditado, cpf: e.target.value })
                        }
                    />
                    {erro && (
                        <div className="alert alert-danger text-center" role="alert">
                            {erro}
                        </div>
                    )}
                    <div className="text-center mt-3">
                        <button className="btn btn-success me-2" type="submit">
                            Salvar
                        </button>
                        <button className="btn btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditResidente;
