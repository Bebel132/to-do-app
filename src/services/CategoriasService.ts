import { Categoria } from "../types/Categoria";
import { api } from "./Api";

const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get('/Categorias')
    return response.data.value;
}

const postCategoria = async (titulo : string) => {
    try {
        await api.post(`/Categorias?Titulo=${titulo}`)
    } catch (err) {
        console.log(err)
    }
}

const deleteCategoria = async (id : number) => {
    try {
        await api.delete(`/Categorias/${id}`);
    } catch (err) {
        console.log(err)
    }
}

export {
    getCategorias,
    postCategoria,
    deleteCategoria
}