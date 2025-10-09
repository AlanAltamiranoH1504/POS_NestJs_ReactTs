import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {findAllCategoriasGET} from "../../../services/CategoriaService";
import {useForm} from "react-hook-form";
import {FormUpdateProducto} from "../../../types";
import {useParams} from "react-router-dom";
import {findProductoById, updateProductoPUT} from "../../../services/ProductosService";
import {useEffect} from "react";
import {toast} from "react-toastify";

const EditProductView = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormUpdateProducto>();
    const params = useParams();
    const id = params.id;
    const queryClient = useQueryClient();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["findAllCategories"],
        queryFn: () => findAllCategoriasGET(),
        retry: false,
        refetchOnWindowFocus: false
    });

    const {data: product} = useQuery({
        queryKey: ["findProductById"],
        queryFn: () => findProductoById(+id),
        retry: false,
        refetchOnWindowFocus: false
    });

    function updateProductoFunction(data: FormUpdateProducto) {
        data.id = +id;
        data.precio = +data.precio;
        updateProductMutation.mutate(data);
    }

    const updateProductMutation = useMutation({
        mutationKey: ["updateProduct"],
        mutationFn: updateProductoPUT,
        onSuccess: () => {
            toast.success("Producto actualizado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["findProductById"]
            })
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })

    useEffect(() => {
        if (product) {
            reset({
                precio: product.precio,
                nombre: product.nombre,
                inventario: product.inventario,
                categoriaId: product.categoria.id
            })
        }
    }, [product]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{errors}</div>;
    }


    if (data) return (
        <>
            <h2 className="text-2xl my-10">Productos</h2>
            <p className="text-lg">En esta seccion podras editar tus productos</p>

            <form
                onSubmit={handleSubmit(updateProductoFunction)}
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
                           value="Actualizar Producto"/>
                </div>
            </form>
        </>
    );
}
export default EditProductView;