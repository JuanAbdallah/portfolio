import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("authUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    
    const logar = async ({ login, senha }) => {
        try {
            const response = await fetch("http://localhost:5269/login/navegador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ login, senha }),
            });
    
            if (response.status === 401) {
                
                throw new Error("Credenciais inválidas. Verifique seu login e senha.");
            }
    
            if (!response.ok) {
                
                throw new Error("Erro no servidor ou credenciais inválidas.");
            }
    
            const userData = await response.json();
    
            if (!userData.login || !userData.role) {
                throw new Error("Resposta inválida da API.");
            }
            
            const newUser = { login: userData.login, role: userData.role , casaId: userData.casaId};
            setUser(newUser);
            localStorage.setItem("authUser", JSON.stringify(newUser));
    
            console.log("Usuário logado com sucesso:", newUser);
    
            
            navigate("/home");  
    
        } catch (error) {
            console.error("Erro no login:", error.message);
            alert(error.message);  
        }
    };
    
    

    
    const logout = () => {
        setUser(null); 
        localStorage.removeItem("authUser"); 
        console.log("Logout realizado com sucesso.");
        navigate("/"); 
    };

    
    useEffect(() => {
        console.log("Usuário atual:", user);
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                logado: !!user, 
                logar,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
