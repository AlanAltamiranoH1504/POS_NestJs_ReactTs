import {ClienteAxios} from "../axios/ClienteAxios";
import {responseCreateTransaccionAPI} from "../schemas/TransaccionesSchemas";

export async function createTransaccionPOST(data) {
    try {
        const responseAPI = await ClienteAxios.post("/transactions", data);
        const resultAPI = responseCreateTransaccionAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}