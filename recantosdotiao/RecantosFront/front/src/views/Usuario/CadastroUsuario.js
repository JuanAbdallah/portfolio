import React, { useEffect, useState } from "react";
import { getCasaSemUser } from "../../service/CasaService";

const CadastrarUsuario = ({ onAdd }) => {
    const [novoUsuario, setNovoUsuario] = useState({ login: "", senha: "", casaId: "" });
    const [erro, setErro] = useState("");
    const [casas, setCasas] = useState([]);
    
    useEffect(() => {           
        fetchCasas();
        console.log("logou");
                
    }, [casas]);

    const fetchCasas = async () => {
        try {
            const casasSemUser = await getCasaSemUser();
            setCasas(casasSemUser || []); 
        } catch (error) {
            console.error("Erro ao buscar casas:", error);
        }
    };

    const enviar = () => {
        
        if (!novoUsuario.login.trim() || !novoUsuario.senha.trim() || !novoUsuario.casaId.trim()) {
            setErro("Por favor, preencha todos os campos!");
            return;
        }
        setErro("");

        
        onAdd(novoUsuario);

        
        setNovoUsuario({ login: "", senha: "", casaId: "" });

    };

    return (
        <div className="container mt-3">
            <h2 className="text-center">Cadastrar Usuário</h2>
            <p className="text-muted text-center mb-4">Preencha os campos abaixo para adicionar um novo usuário.</p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">
                            Login do Usuário
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            placeholder="Digite o login do usuário"
                            value={novoUsuario.login}
                            onChange={(e) => setNovoUsuario({ ...novoUsuario, login: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label">
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="senha"
                            placeholder="Digite a senha do usuário"
                            value={novoUsuario.senha}
                            onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="casa" className="form-label">
                            Número da Casa
                        </label>
                        <select
                            className="form-control"
                            id="casa"
                            value={novoUsuario.casaId}
                            onChange={(e) => setNovoUsuario({ ...novoUsuario, casaId: e.target.value })}
                        >
                            <option value="">Selecione uma casa</option>
                            {casas.map((casa) => (
                                <option key={casa.id} value={casa.id}>
                                    {casa.numero}
                                </option>
                            ))}
                        </select>
                    </div>
                    {erro && (
                        <div className="alert alert-danger text-center" >
                            {erro}
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={enviar}>
                            Cadastrar Usuário
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastrarUsuario;
