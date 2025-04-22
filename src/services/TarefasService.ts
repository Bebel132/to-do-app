import { Tarefa } from "../types/Tarefas";
import { api } from "./Api";

const getTarefas = async (): Promise<Tarefa[]> => {
    const response = await api.get('/Tarefas?$expand=Categoria($select=Titulo)');
    return response.data.value;
}

const postTarefa = async ({Titulo, Desc, CategoriaId} : Tarefa) => {
    await api.post(`/Tarefas?Titulo=${Titulo}&Desc=${Desc}&Status=true&CategoriaId=${CategoriaId}`);
}

const deleteTarefa = async (id : number) => {
    try {
        await api.delete(`/Tarefas/${id}`);
    } catch (err) {
        console.log(err);
    }
}

export {
    getTarefas,
    postTarefa,
    deleteTarefa
}