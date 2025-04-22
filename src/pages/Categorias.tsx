import { Box, Button, Modal } from "@mui/material";
import { MenuOpt } from "../components/Menu";
import { Tabela } from "../components/Tabela";
import { useEffect, useState } from "react";
import { Formulario } from "../components/Formulario";
import { Categoria } from "../types/Categoria";
import { getCategorias } from "../services/CategoriasService";

export const Categorias = () => {
    const [categorias, setCategorias] = useState<Categoria[] | null>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const fetchCategorias = async () => {
        setCategorias(await getCategorias());
    }

    useEffect(() => {
        fetchCategorias();
    }, [])

    return (
        <>
            <Box textAlign='center'>
                <MenuOpt paginaAtual="Categorias" paginaAlvo="Tarefas" link="/Tarefas" />
                <Tabela categorias={categorias || undefined} fetch={fetchCategorias} />
                <Button onClick={handleOpen} variant="contained">novo</Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '5px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Formulario tipo="categoria" fetch={fetchCategorias} handleClose={handleClose}/>
                </Box>
            </Modal>
        </>
    );
}