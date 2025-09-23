import {ClienteAxios} from "../axios/ClienteAxios";
import {findByIdResponseAPI} from "../schemas/CategoriasSchemas";
import type {CategoriaDB} from "../types";

export async function findCategoriaByIdPOST(id: number): Promise<CategoriaDB> {
    try {
        const responseAPI = await ClienteAxios.get(`/categorias/${id}`);
        const resultAPI = findByIdResponseAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        throw new Error("Categoria no encontrada o formato incorrecto");
    } catch (e) {
        throw e;
    }
}