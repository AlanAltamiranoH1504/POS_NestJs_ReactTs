import type {FormEvent} from "react";
import {useCarritoStorage} from "../../store/AppStore";
import {useMutation} from "@tanstack/react-query";
import {createTransaccionPOST} from "../../services/TransaccionesService";
import {toast} from "react-toastify";


const SubmitOrder = () => {
    const {productosOrder, total, cuponApply, deleteOrden} = useCarritoStorage();

    function prepareOrder (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const productos = productosOrder.map((producto) => {
            return {
                cantidad: +producto.cantidad,
                precio: +producto.precio,
                productoId: producto.id
            }
        });
        const ordenBody = {
            total: total,
            contenido: productos,
            ...(cuponApply.cupon ? {cupon: cuponApply.cupon.slug} : {})
        }
        createTransactionMutation.mutate(ordenBody);
    }

    const createTransactionMutation = useMutation({
        mutationKey: ["createTransaction"],
        mutationFn: createTransaccionPOST,
        onSuccess: () => {
            toast.success("Pedido realizado correctamente");
            deleteOrden();
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    })

    return (
        <>
            <form
                onSubmit={(e) => {
                    prepareOrder (e)
                }}
            >
                <input type={"submit"}
                       className=" mt-5 w-full bg-indigo-700 hover:bg-indigo-800 cursor-pointer transition-colors duration-500 text-white rounded-lg uppercase font-bold py-2"
                       value={"Confirmar Compra"}
                />
            </form>
        </>
    );
}
export default SubmitOrder;