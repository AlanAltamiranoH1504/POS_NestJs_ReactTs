import {ClienteAxios} from "../axios/ClienteAxios";
import {findByIdResponseAPI} from "../schemas/CategoriasSchemas";

export async function findCategoriaByIdPOST(id: number) {
    try {
        const responseAPI = await ClienteAxios.get(`/categorias/${id}`);
        const resultAPI = findByIdResponseAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        return [];
    } catch (e) {
        throw e;
    }
}