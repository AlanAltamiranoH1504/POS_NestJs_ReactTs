import type {FormCupon} from "../types";
import {ClienteAxios} from "../axios/ClienteAxios";
import {responseAplyCuponAPI} from "../schemas/CuponesScgemas";

export async function applyCuponPOST(data: FormCupon) {
    try {
        const responseAPI = await ClienteAxios.post("/cupones/aplicar_cupon", data);
        const resultAPI = responseAplyCuponAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        // throw new Error(`Error en busqueda de cupón '${data.slug}'`);
    } catch (e) {
        // @ts-ignore
        throw new Error(`Error en aplicacion de cupón: ${e.message}`);
    }
}