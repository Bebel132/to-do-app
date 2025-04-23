import { Categoria } from "../types/Categoria";
import { api } from "./Api";

const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get('/Categorias');
    return response.data.value;
}

const postCategoria = async (titulo : string) => {
    await api.post(`/Categorias?Titulo=${titulo}`);
}

const putCategoria = async ({Id, Titulo} : Categoria) => {
    await api.put(`/Categorias/${Id}?Id=${Id}&Titulo=${Titulo}`)
}

const deleteCategoria = async (id : number) => {
    await api.delete(`/Categorias/${id}`);
}

export {
    getCategorias,
    postCategoria,
    putCategoria,
    deleteCategoria
}