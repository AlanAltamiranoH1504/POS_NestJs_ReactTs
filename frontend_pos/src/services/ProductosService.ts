import {FormCreateProducto, ProductosFindAll} from "../types";
import {ClienteAxios} from "../axios/ClienteAxios";
import {responseCreateProducto, responseDeleteProducto, responseFindAllProductos} from "../schemas/ProductosSchemas";

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

export async function createProductPOST(data: FormCreateProducto) {
    try {
        const responseAPI = await ClienteAxios.post("/productos", data);
        const resultAPI = responseCreateProducto.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function deleteProductDELETE(id: number) {
    try {
        const responseAPI = await ClienteAxios.delete(`/productos/${id}`);
        const resultAPI = responseDeleteProducto.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}