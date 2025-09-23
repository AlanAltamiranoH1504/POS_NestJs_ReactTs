export const formatoMoneda = (monto: number) => {
    return Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXM"
    }).format(monto);
}