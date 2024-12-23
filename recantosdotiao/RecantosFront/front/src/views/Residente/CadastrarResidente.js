import React, { useState, useEffect } from "react";
import { fetchCasas } from "../../service/CasaService"; // Certifique-se de usar o caminho correto para o serviço
import { adicionarResidente } from "../../service/ResidenteService";

const CadastrarResidente = () => {
    const [novoResidente, setNovoResidente] = useState({ nome: "", casaId: "", cpf: "" });
    const [casas, setCasas] = useState([]);

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

    const AdicionaResidente = async (e) => {
        e.preventDefault();
        if (!novoResidente.nome.trim() || !novoResidente.casaId.trim() || !novoResidente.cpf.trim()) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await adicionarResidente(novoResidente);

            if (response) {
                alert("Residente cadastrado com sucesso!");
                setNovoResidente({ nome: "", casaId: "", cpf: "" });
            } else {
                console.log(novoResidente);
                
                alert("Erro ao cadastrar residente.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na conexão com o servidor.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Cadastrar Residente</h2>
            <form onSubmit={AdicionaResidente}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Nome"
                        value={novoResidente.nome}
                        onChange={(e) =>
                            setNovoResidente({ ...novoResidente, nome: e.target.value })
                        }
                    />
                    <select
                        className="form-control mb-2"
                        value={novoResidente.casaId}
                        onChange={(e) =>
                            setNovoResidente({ ...novoResidente, casaId: e.target.value })
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
                        value={novoResidente.cpf}
                        onChange={(e) =>
                            setNovoResidente({ ...novoResidente, cpf: e.target.value })
                        }
                    />
                    <button className="btn btn-primary" type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastrarResidente;
