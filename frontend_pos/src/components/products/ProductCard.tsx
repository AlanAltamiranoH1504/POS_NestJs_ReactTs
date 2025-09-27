import type {ProductoDB} from "../../types";
import {formatoMoneda} from "../../helpers";
import {useCarritoStorage} from "../../store/AppStore";

type ProductCardProps = {
    producto: ProductoDB
}
const ProductCard = ({producto}: ProductCardProps) => {
    const {addProduct} = useCarritoStorage();
    return (
        <>
            <div className="rounded bg-white shadow relative p-5">
                <div>
                    <img
                        src={`http://localhost:3000/img/${producto.imagen}`}
                        alt={`Imagen de producto ${producto.nombre}`}
                    />
                    <div className="p-3 space-y-2">
                        <h3 className="text-xl font-bold text-gray-600">{producto.nombre}</h3>
                        <p className="text-gray-500">Disponibles: {producto.inventario}</p>
                        <p className="text-2xl font-extrabold  text-gray-900">{formatoMoneda(+producto.precio)}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="absolute top-5 -right-3"
                    onClick={() => {
                        addProduct(producto);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-8 h-8 bg-indigo-600 rounded-full text-white">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </button>
            </div>
        </>
    );
}
export default ProductCard;