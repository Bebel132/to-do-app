import { createBrowserRouter } from "react-router";
import { Tarefas } from "../pages/Tarefas";
import { Categorias } from "../pages/Categorias";

export const appRoutes = createBrowserRouter([
    {   
        path: '/',
        Component: Tarefas,
    },
    {   
        path: '/Tarefas',
        Component: Tarefas,
    },
    {   
        path: '/Categorias',
        Component: Categorias,
    }
])