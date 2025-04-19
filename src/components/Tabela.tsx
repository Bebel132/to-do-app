import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Tarefa } from "../types/Tarefas";
import { Categoria } from "../types/Categoria";

interface tabelaProps {
    tarefas?: Tarefa[],
    categorias?: Categoria[]
}

export const Tabela = ({tarefas, categorias} : tabelaProps) => {
    return (
        <TableContainer sx={{maxWidth: 500, margin: "50px auto"}} component={Paper}>
            {tarefas && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Titulo</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Descrição</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Categoria</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tarefas?.map(tarefa => (
                            <TableRow>
                                <TableCell>{tarefa.Titulo}</TableCell>
                                <TableCell>{tarefa.Desc}</TableCell>
                                <TableCell>{tarefa.Categoria.Titulo}</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}