import {ProductosFindAllInfer} from "../../../types";
import {formatoMoneda} from "../../../helpers";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

type ProductoTableProps = {
    productos: ProductosFindAllInfer
}

type SearchParams = {
    pagina: string
}
const ProductosTable = ({productos}: ProductoTableProps) => {
    const products = productos.data;

    function deleteProductoFunction(id: number) {
        console.log(`Eliminando producto con id ${id}`);
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 mt-10">
                <div className="mt-8 flow-root ">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Imagen
                                    </th>

                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Producto
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Precio
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Inventario
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <img alt={`Imagen de producto ${product.nombre}`}
                                                 className="max-h-32"
                                                 src={`http://localhost:3000/img/${product.imagen}`}
                                            />
                                        </td>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.nombre}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            {formatoMoneda(product.precio)}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            {product.inventario}
                                        </td>
                                        <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                                            <div className='flex gap-5 justify-end items-center'>
                                                <Link to={`/admin/products/edit/${product.id}`}
                                                      className="text-indigo-600 hover:text-indigo-700 font-semibold">Editar <span
                                                    className="sr-only">{product.nombre}</span></Link>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        deleteProductoFunction(product.id);
                                                    }}
                                                    className="text-red-600 hover:text-red-700 font-semibold">Eliminar <span
                                                    className="sr-only">{product.nombre}</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductosTable;