import {ClienteAxios} from "../axios/ClienteAxios";
import {responseCreateTransaccionAPI} from "../schemas/TransaccionesSchemas";

export async function createTransaccionPOST(data: any) {
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

export async function findAllTransacctionGET(dateTransaction: string) {
    try {
        const responseAPI = await ClienteAxios.get(`/transactions?transactionDate=${dateTransaction}`);
        return responseAPI.data;
    } catch {
        throw new Error("Error en busqueda de transacciones desde administracion");
    }
}