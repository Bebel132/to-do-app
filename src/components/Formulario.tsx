import { useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { Categoria } from "../types/Categoria";
import { postCategoria } from "../services/CategoriasService";
import { postTarefa } from "../services/TarefasService";

type TipoFormulario = "tarefa" | "categoria";

interface FormularioProps {
    tipo: TipoFormulario,
    categorias?: Categoria[],
    fetch: () => Promise<void>,
    handleClose: () => void
}

export const Formulario = ({ tipo, categorias = [], fetch, handleClose }: FormularioProps) => {
    const [Titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(tipo === "tarefa") {
            const newTarefa = {
                Titulo: Titulo, 
                Desc: descricao, 
                CategoriaId: categoriaSelecionada?.Id!, 
                Status: true
            };
            
            await postTarefa(newTarefa);

        } else {
            postCategoria(Titulo); 
        }
        fetch && await fetch();

        setTitulo("");
        setDescricao("");
        setCategoriaSelecionada(null);

        handleClose();
    };

    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", maxWidth: 400, mx: "auto", mt: 4, gap: 2 }}
        >
        <Typography variant="h6" textAlign="center">
            {tipo === "tarefa" ? "Criar Nova Tarefa" : "Criar Nova Categoria"}
        </Typography>

        <TextField
            label="Título"
            value={Titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
        />

        {tipo === "tarefa" && (
            <>
            <TextField
                label="Descrição"
                multiline
                minRows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <TextField
                select
                label="Categoria"
                value={categoriaSelecionada?.Id}
                onChange={(e) => {
                    const categoria = categorias.find(c => c.Id === Number(e.target.value)) || null;
                    setCategoriaSelecionada(categoria)
                }}
                required
            >
                {categorias.map((cat) => (
                <MenuItem key={cat.Id} value={cat.Id}>
                    {cat.Titulo}
                </MenuItem>
                ))}
            </TextField>
            </>
        )}

        <Button type="submit" variant="contained">
            {tipo === "tarefa" ? "Criar Tarefa" : "Criar Categoria"}
        </Button>
        </Box>
    );
};
