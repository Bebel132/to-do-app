import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Tarefa } from "../types/Tarefas";
import { Categoria } from "../types/Categoria";
import { deleteCategoria } from "../services/CategoriasService";
import { deleteTarefa } from "../services/TarefasService";

interface tabelaProps {
    tarefas?: Tarefa[],
    categorias?: Categoria[],
    fetch?: () => Promise<void>,
}

export const Tabela = ({tarefas, categorias, fetch} : tabelaProps) => {
    const handleDelete = async (id: number) => {
        tarefas ? await deleteTarefa(id) : await deleteCategoria(id);
        fetch && await fetch();
    };

    return (
        <>
            <TableContainer sx={{maxWidth: 800, margin: "50px auto"}} component={Paper}>
                {tarefas && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Titulo</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Descrição</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Categoria</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tarefas?.map(tarefa => (
                                <TableRow>
                                    <TableCell>{tarefa.Titulo}</TableCell>
                                    <TableCell>{tarefa.Desc}</TableCell>
                                    <TableCell>{tarefa.Categoria!.Titulo}</TableCell>
                                    <TableCell sx={{float: "right"}}>
                                        <Button variant="contained" sx={{background: '#ff3535', mr: 3}} onClick={() => handleDelete(tarefa.Id!)}>Apagar</Button>
                                        <Button variant="contained" sx={{background: '#3598ff'}} onClick={() => handleDelete(tarefa.Id!)}>Editar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {categorias && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Titulo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categorias?.map(categoria => (
                                <TableRow>
                                    <TableCell>{categoria.Titulo}</TableCell>
                                    <TableCell><Button variant="contained" sx={{background: '#ff3535', float: "right"}} onClick={() => handleDelete(categoria.Id!)}>Apagar</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </>
    );
}