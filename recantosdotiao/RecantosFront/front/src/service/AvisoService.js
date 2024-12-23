const api_url = "http://localhost:5269/avisos";

export const fetchAvisos = async () => {
    try {
        const response = await fetch(api_url, { credentials: "include" });
        if (!response.ok) throw new Error("Erro ao carregar avisos.");
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

export const fetchAllAvisos = async () => {
    try {
        const response = await fetch(`${api_url}/all`, { credentials: "include" });
        if (!response.ok) throw new Error("Erro ao carregar todos os avisos.");
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

export const adicionarAviso = async (aviso) => {
    console.log(aviso);
    
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aviso),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao adicionar aviso:", error);
        return false;
    }
};

export const atualizarAviso = async (aviso) => {
    try {
        const response = await fetch(`${api_url}/${aviso.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aviso),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao atualizar aviso:", error);
        return false;
    }
};

export const deletarAviso = async (id) => {
    try {
        const response = await fetch(`${api_url}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao deletar aviso:", error);
        return false;
    }
};
