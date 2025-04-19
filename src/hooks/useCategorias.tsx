import { useEffect, useState } from "react"
import { Categoria } from "../types/Categoria";
import { getCategorias } from "../services/CategoriasService";

export const UseCategorias = () => {
    const [categorias, setCategorias] = useState<Categoria[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategorias();
            setCategorias(data);
        };

        fetchData();
    }, []);
    
    return categorias;
}