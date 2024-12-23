const api_url = "http://localhost:5269/blocos";

export const fetchBlocos = async () => {
    try {
        const response = await fetch(api_url, { credentials: "include" });
        if (!response.ok) throw new Error("Erro ao carregar blocos.");
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

export const adicionarBloco = async (bloco) => {
    try {
        console.log(bloco);
        
        const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({nome: bloco.nome, casasId: []}),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao adicionar bloco:", error);
        return false;
    }
};

export const atualizarBloco = async (bloco) => {
    try {
        const response = await fetch(`${api_url}/${bloco.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bloco),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao atualizar bloco:", error);
        return false;
    }
};

export const deletarBloco = async (id) =>{
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
