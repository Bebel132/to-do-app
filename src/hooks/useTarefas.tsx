import { useEffect, useState } from "react"
import { Tarefa } from "../types/Tarefas"
import { getTarefas } from "../services/TarefasService";

export const UseTarefas = () => {
    const [tarefas, setTarefas] = useState<Tarefa[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTarefas();
            setTarefas(data);
        };

        fetchData();
    }, []);
    
    return tarefas;
}