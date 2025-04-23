import { Box, Button, Modal } from "@mui/material";
import { MenuOpt } from "../components/Menu";
import { Tabela } from "../components/Tabela";
import { useEffect, useState } from "react";
import { Formulario } from "../components/Formulario";
import { UseCategorias } from "../hooks/useCategorias";
import { getTarefas } from "../services/TarefasService";
import { Tarefa } from "../types/Tarefas";

export const Tarefas = () => {
    const [tarefas, setTarefas] = useState<Tarefa[] | null>(null);
    const [tarefaEdit, setTarefaEdit] = useState<Tarefa | null>(null);
    const [acao, setAcao] = useState<"criar" | "editar">("criar");
    const categorias = UseCategorias();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchTarefas = async () => {
        setTarefas(await getTarefas());
    }
    
    useEffect(() => {
        fetchTarefas();
    }, [])
    
    return (
        <>
            <Box textAlign='center'>
                <MenuOpt paginaAtual="Tarefas" paginaAlvo="Categorias" link="/Categorias" />
                <Tabela 
                    tarefas={tarefas || undefined}
                    handleOpen={handleOpen}
                    setAcao={setAcao}
                    fetch={fetchTarefas}
                    setTarefaEdit={setTarefaEdit}
                />
                <Button onClick={() => {handleOpen(), setAcao("criar")}} variant="contained">novo</Button>
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
                    <Formulario 
                        tipo="tarefa" 
                        acao={acao} 
                        tarefaEdit={tarefaEdit || undefined}
                        categorias={categorias || undefined} 
                        fetch={fetchTarefas} 
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </>
    );
}