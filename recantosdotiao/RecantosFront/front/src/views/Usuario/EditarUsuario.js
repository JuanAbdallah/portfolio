import React, { useState, useEffect } from "react";
import { getCasaSemUser } from "../../service/CasaService";

const EditUsuario = ({ usuario, onSave, onCancel }) => {
    const [editando, setEditando] = useState({ ...usuario });
    const [erro, setErro] = useState("");
    const [casas, setCasas] = useState([]);

    useEffect(() => {    
        console.log(editando);
               
        fetchCasas();        
    }, []);

    const fetchCasas = async () => {
        try {
            const casasSemUser = await getCasaSemUser();
            setCasas(casasSemUser || []); 
        } catch (error) {
            console.error("Erro ao buscar casas:", error);
        }
    };

    const EditaUser = () => {
        if (!editando.login.trim()) {
            setErro("Por favor, preencha os campos vazios!");
            return;
        }
        console.log(editando);
        
        setErro(""); 
        onSave(editando);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Editar Usuários</h2>
            <p className="text-muted text-center mb-4">
                Modifique as informações abaixo e clique em "Salvar" para confirmar as alterações.
            </p>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                            Login do Usuario
                        </label>
                        <input
                            type="text"
                            id="login"
                            className="form-control"
                            placeholder="Login do Usuario"
                            value={editando.login}
                            onChange={(e) => setEditando({ ...editando, login: e.target.value })}
                        />
                        <label htmlFor="senha" className="form-label">
                            Senha
                        </label>
                       <input
                            type="password"
                            id="role"
                            className="form-control"
                            placeholder="Senha do usuário"
                            value={editando.senha}
                            onChange={(e) => setEditando({ ...editando, senha: e.target.value })}
                        />
                        <label htmlFor="casa" className="form-label">
                            Número da Casa
                        </label>
                        <select
                            className="form-control"
                            id="casa"
                            value={editando.casaId}
                            onChange={(e) => setEditando({ ...editando, casaId: e.target.value })}
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
                        <div className="alert alert-danger text-center" role="alert">
                            {erro}
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-success me-2" onClick={EditaUser}>
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

export default EditUsuario;
