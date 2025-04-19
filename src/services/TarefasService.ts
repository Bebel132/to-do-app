import { Tarefa } from "../types/Tarefas";
import { api } from "./Api";

const getTarefas = async (): Promise<Tarefa[]> => {
    const response = await api.get('/Tarefas?$expand=Categoria($select=Titulo)')
    return response.data.value;
}

export {
    getTarefas
}