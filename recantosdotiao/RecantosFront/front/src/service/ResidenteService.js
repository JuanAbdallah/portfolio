const api_url = "http://localhost:5269/residentes";

export const fetchResidentes = async () => {
    try {
        const response = await fetch(api_url, {
             credentials: "include" 
            });
        if (!response.ok)
         throw new Error("Erro ao carregar residentes.");

        return await response.json();

    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

export const fetchResidenteById = async (id) => {
    try {
        const response = await fetch(`${api_url}/${id}`, {
             credentials: "include" 
            });
        if (!response.ok) 
            throw new Error("Erro ao carregar residente.");
        
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

export const adicionarResidente = async (residente) => {
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(residente),
            credentials: "include",
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ao adicionar residente: ${errorMessage}`);
        }
        return true;
    } catch (error) {
        console.error("Erro ao adicionar residente:", error);
        return false;
    }
};

export const atualizarResidente = async (residente) => {
    try {
        const response = await fetch(`${api_url}/${residente.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(residente),
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao atualizar residente:", error);
        return false;
    }
};

export const deletarResidente = async (id) => {
    try {
        const response = await fetch(`${api_url}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao deletar residente:", error);
        return false;
    }
};

export const buscarResidentesPorCasa = async (casaId) =>{
    try {
        const response = await fetch(`${api_url}/casa/${casaId}`, {
             credentials: "include" 
            });
        if (!response.ok) 
            throw new Error("Erro ao carregar residentes.");
        
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}
