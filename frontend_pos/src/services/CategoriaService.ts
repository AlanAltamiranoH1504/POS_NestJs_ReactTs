import {ClienteAxios} from "../axios/ClienteAxios";
import {findAllResponseAPI, findByIdResponseAPI} from "../schemas/CategoriasSchemas";
import type {CategoriaDB, Categoria} from "../types";

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

export async function findAllCategoriasGET(): Promise<Categoria[]> {
    try {
        const responseAPI = await ClienteAxios.get("/categorias");
        const resultAPI = findAllResponseAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        throw new Error("Categorias no encontradas o formato incorrecto");
    } catch (e) {
        throw new Error("Error en obtencion de categorias");
    }
}