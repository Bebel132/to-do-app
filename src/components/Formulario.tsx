import { useEffect, useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { Categoria } from "../types/Categoria";
import { postCategoria, putCategoria } from "../services/CategoriasService";
import { postTarefa, putTarefa } from "../services/TarefasService";
import { Tarefa } from "../types/Tarefas";

type TipoFormulario = "tarefa" | "categoria";
type AcaoFormulario = "criar" | "editar";

interface FormularioProps {
    tipo: TipoFormulario,
    acao: AcaoFormulario,
    tarefaEdit?: Tarefa,
    categoriaEdit?: Categoria,
    categorias?: Categoria[],
    fetch: () => Promise<void>,
    handleClose: () => void
}

export const Formulario = ({ 
        tipo, 
        acao, 
        tarefaEdit,
        categoriaEdit,
        categorias = [],
        fetch, 
        handleClose 
    }: FormularioProps) => {
    const [Titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

    useEffect(() => {
        if(acao === "editar") {
            if(tipo === "tarefa" && tarefaEdit){
                setTitulo(tarefaEdit.Titulo);
                setDescricao(tarefaEdit.Desc);
                setCategoriaSelecionada(categorias.find(c => c.Id == tarefaEdit.CategoriaId) || null)
            } else if(tipo === "categoria" && categoriaEdit) {
                setTitulo(categoriaEdit.Titulo)
            }
        } else {
            setTitulo("");
            setDescricao("");
            setCategoriaSelecionada(null);
        }
    }, [acao, tipo, tarefaEdit?.Id, categoriaEdit?.Id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(tipo === "tarefa") {
            const newTarefa = {
                Id: tarefaEdit?.Id,
                Titulo: Titulo, 
                Desc: descricao, 
                CategoriaId: categoriaSelecionada?.Id!, 
                Status: true
            };
            acao === "criar" ? await postTarefa(newTarefa) : await putTarefa(newTarefa)

        } else {
            if(acao === "criar") {
                await postCategoria(Titulo);
            } else if(acao === "editar" && categoriaEdit) {
                await putCategoria({Id: categoriaEdit.Id, Titulo: Titulo})
            }
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
        sx={{ 
            display: "flex", 
            flexDirection: "column", 
            maxWidth: 400, 
            mx: "auto", 
            mt: 4, 
            gap: 2 
        }}
        >
        <Typography variant="h6" textAlign="center">
            {
                tipo === "tarefa" 
                    ? acao === "criar" 
                        ? "Criar Nova Tarefa"
                        : "Editar Tarefa" 
                    : acao === "criar"
                        ? "Criar Nova Categoria"
                        : "Editar Categoria"
            }
        </Typography>
        
        <TextField
            label="Título"
            value={Titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
        />
        {
            tipo === "tarefa" && (
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
                        value={categoriaSelecionada?.Id || ""}
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
            )
        }

        <Button type="submit" variant="contained">
            {
                tipo === "tarefa" 
                ? acao === "criar" 
                    ? "Criar"
                    : "Editar" 
                : acao === "criar"
                    ? "Criar"
                    : "Editar"
            }
        </Button>
        </Box>
    );
};
