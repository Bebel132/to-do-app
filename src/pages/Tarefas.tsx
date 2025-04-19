import { Box } from "@mui/material";
import { MenuOpt } from "../components/Menu";
import { Tabela } from "../components/Tabela";
import { UseTarefas } from "../hooks/useTarefas";

export const Tarefas = () => {
    const tarefas = UseTarefas();

    return (
        <Box textAlign='center'>
            <MenuOpt paginaAtual="Tarefas" paginaAlvo="Categorias" link="/Categorias" />
            <Tabela tarefas={tarefas || undefined} />
        </Box>
    );
}