import { Categoria } from "../types/Categoria";
import { api } from "./Api";

const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get('/Categorias')
    return response.data.value;
}

export {
    getCategorias
}