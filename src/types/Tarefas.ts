import { Categoria } from "./Categoria"

export interface Tarefa {
    Id: number
    Titulo: string
    Desc: string
    Status: boolean
    CategoriaId: number
    Categoria: Categoria
}