const api_url = "http://localhost:5269/casas";

export const fetchCasas = async () => {
    try {
        const response = await fetch(api_url, { credentials: "include" });
        if (!response.ok) throw new Error("Erro ao carregar casas.");
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

export const buscarCasaPorId = async (id) =>{
    try {
        const response = await fetch(`${api_url}/${id}`, { credentials: "include" });
        if (!response.ok) throw new Error("Erro ao carregar casa.");
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}

export const adicionarCasa = async (casa) => {
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(casa),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao adicionar casa:", error);
        return false;
    }
};

export const atualizarCasa = async (casa) => {
    try {
        const response = await fetch(`${api_url}/${casa.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(casa),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao atualizar casa:", error);
        return false;
    }
};

export const deletarCasa = async (id) =>{
    try {

        const response = await fetch(`${api_url}/${id}`,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao deletar casa:", error);
        return false;
    }
}

export const getCasaSemUser = async (id) => {
    try {
        const response = await fetch(`${api_url}/semUser`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json(); 
            return data; 
        } else {
            console.error(`Erro status: ${response.status}`);
            return null; 
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null; 
    }
};

