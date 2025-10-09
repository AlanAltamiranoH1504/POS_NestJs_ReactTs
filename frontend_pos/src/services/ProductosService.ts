import {ProductosFindAll} from "../types";
import {ClienteAxios} from "../axios/ClienteAxios";
import {responseFindAllProductos} from "../schemas/ProductosSchemas";

export async function findAllProductsGET(data: ProductosFindAll) {
    try {
        const responseAPI = await ClienteAxios.get(`/productos?take=${data.take}&page=${data.page}&categoria_id=${data.categoria_id}`);
        const resultAPI = responseFindAllProductos.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}