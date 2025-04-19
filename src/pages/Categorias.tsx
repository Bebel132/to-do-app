import { Box } from "@mui/material";
import { MenuOpt } from "../components/Menu";
import { Tabela } from "../components/Tabela";
import { UseCategorias } from "../hooks/useCategorias";

export const Categorias = () => {
    const categorias = UseCategorias();

    return (
        <Box textAlign='center'>
            <MenuOpt paginaAtual="Categorias" paginaAlvo="Tarefas" link="/Tarefas" />
            <Tabela categorias={categorias || undefined} />
        </Box>
        
    );
}