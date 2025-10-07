import {format} from "date-fns";

export const formatoMoneda = (monto: number) => {
    return Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXM"
    }).format(monto);
}

export const formatoFecha = (fecha: string) => {
    return format(fecha, "yyyy-MM-dd");
}