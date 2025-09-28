import {useForm} from "react-hook-form";
import type {FormCupon} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {applyCuponPOST} from "../../services/CuponesService";
import {toast} from "react-toastify";
import {useCarritoStorage} from "../../store/AppStore";

const CuponForm = () => {
    const {register, handleSubmit} = useForm<FormCupon>();
    const {addCupon} = useCarritoStorage();

    function applyCuponFunction(data: FormCupon) {
        aplyCuponMutation.mutate(data);
    }

    const aplyCuponMutation = useMutation({
        mutationKey: ["aplyCupon"],
        mutationFn: applyCuponPOST,
        onSuccess: (data) => {
            toast.success("Cupon encontrado");
            addCupon(data);
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error.response.data.message);
        }
    });
    return (
        <>
            <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>
            <form
                className="flex"
                onSubmit={handleSubmit(applyCuponFunction)}
            >
                <input
                    type="text"
                    className="p-2 bg-gray-200 border-gray-300 w-full"
                    placeholder="Ingresa un cupón"
                    {...register("slug")}
                />
                <input
                    type="submit"
                    className="p-3 bg-green-400 font-bold hover:cursor-pointer"
                    value='Canjear'
                />
            </form>
        </>
    );
}
export default CuponForm;