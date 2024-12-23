const api_url = "http://localhost:5269/usuarios";

export const fetchUsuarios = async () => {
    try {
        const response = await fetch(api_url, { credentials: "include" });
        if (!response.ok) throw new Error("Erro ao carregar usuários.");
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

export const adicionarUsuario = async (usuario) => {
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
        return false;
    }
};

export const adicionarUsuarioAdmin = async (usuario) => {
    try {
        const response = await fetch(`${api_url}/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao adicionar administrador:", error);
        return false;
    }
};

export const atualizarUsuario = async (usuario) => {
    try {
        const response = await fetch(`${api_url}/${usuario.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return false;
    }
};

export const deletarUsuario = async (id) => {
    try {
        const response = await fetch(`${api_url}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return false;
    }
};


