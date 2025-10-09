import {useForm} from "react-hook-form";
import {FormCreateProducto} from "../../../types";
import {useMutation, useQuery} from "@tanstack/react-query";
import {findAllCategoriasGET} from "../../../services/CategoriaService";
import {createProductPOST} from "../../../services/ProductosService";
import {toast} from "react-toastify";

const CreateProductView = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormCreateProducto>();

    function createProductoFunction(data: FormCreateProducto) {
        // console.log(data)
        const producto: FormCreateProducto = {
            nombre: data.nombre,
            precio: +data.precio,
            inventario: +data.inventario,
            categoriaId: +data.categoriaId
        }
        createProductMutation.mutate(producto);
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findAllCategories"],
        queryFn: () => findAllCategoriasGET(),
        retry: false,
        refetchOnWindowFocus: false
    });

    const createProductMutation = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: createProductPOST,
        onSuccess: () => {
            toast.success("Producto creado correctamente");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h2 className="text-2xl my-10">Productos</h2>
            <p className="text-lg">En esta seccion podras crear nuevos productos</p>

            <form
                onSubmit={handleSubmit(createProductoFunction)}
                className="bg-gray-100 px-5 py-10 rounded-lg shadow mt-5">

                <div className="space-y-2 ">
                    <label
                        htmlFor="name"
                        className="block font-semibold"
                    >Nombre Producto</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre Producto"
                        className="border border-gray-300 w-full p-2 rounded-lg"
                        {...register("nombre", {
                            required: "El nombre es obligatorio"
                        })}
                    />

                    <div className="bg-red-100 text-red-600 text-center font-semibold rounded-sm">
                        {errors.nombre && String(errors.nombre.message)}
                    </div>
                </div>

                <div className="space-y-2 ">
                    <label
                        htmlFor="price"
                        className="block font-semibold"
                    >Precio</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Precio Producto"
                        className="border border-gray-300 w-full p-2 rounded-lg"
                        {...register("precio", {
                            required: "El precio es obligatorio",
                            min: {
                                value: 1,
                                message: "El precio minimo es $1.00"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-semibold rounded-sm">
                        {errors.precio && String(errors.precio.message)}
                    </div>
                </div>

                <div className="space-y-2 ">
                    <label
                        htmlFor="inventory"
                        className="block font-semibold"
                    >Inventario</label>
                    <input
                        id="inventory"
                        type="number"
                        placeholder="Cantidad Disponible"
                        className="border border-gray-300 w-full p-2 rounded-lg"
                        {...register("inventario", {
                            required: "El inventario es obligatorio",
                            min: {
                                value: 1,
                                message: "El inventario minimo es de una unidad"
                            }
                        })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-semibold rounded-sm">
                        {errors.inventario && String(errors.inventario.message)}
                    </div>
                </div>

                <div className="space-y-2 ">
                    <label
                        htmlFor="categoryId"
                        className="block font-semibold"
                    >Categoría</label>
                    <select
                        id="categoryId"
                        className="border border-gray-300 w-full p-2 bg-white rounded-lg"
                        {...register("categoriaId", {
                            required: "La categoria es obligatoria"
                        })}
                    >
                        <option value="">Seleccionar Categoría</option>
                        {data.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                        ))}
                    </select>
                    <div className="bg-red-100 text-red-600 text-center font-semibold rounded-sm">
                        {errors.categoriaId && String(errors.categoriaId.message)}
                    </div>
                </div>

                <div className="space-y-2 ">
                    <input type="submit"
                           className="w-full rounded-lg py-2 text-white font-semibold hover:bg-green-700 transition-colors duration-500 cursor-pointer text-lg border bg-green-600 mt-4"
                           value="Agregar Producto"/>
                </div>
            </form>
        </>
    );
}
export default CreateProductView;