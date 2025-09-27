import type {ProductoCarrito} from "../../types";
import {formatoMoneda} from "../../helpers";

type ShoppingCartProps = {
    producto: ProductoCarrito
}
const ShoppingCart = ({producto}: ShoppingCartProps) => {
    return (
        <>
            <li className="flex items-center space-x-6 py-6 relative">
                <div className='h-24 w-24'>
                    <img
                        src={`http://localhost:3000/img/${producto.imagen}`}
                        alt={`Imagen de ${producto.nombre}`}
                    />
                </div>
                <div className="flex-auto space-y-2">
                    <h3 className="text-gray-900">
                        {producto.nombre}
                    </h3>
                    <p>{formatoMoneda(+producto.precio)}</p>
                    <select
                        className="w-32 text-center p-2 rounded-lg bg-white"
                        value={producto.cantidad}
                        onChange={() => {
                        }}
                    >
                        {Array.from({length: producto.inventario}, (_, i) => i + 1).map((option) => {
                            return (
                                <option key={option} value={option}>{option}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='absolute top-10 -right-0'>
                    <button
                        type="button"
                        onClick={() => {
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-8 h-8 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </button>
                </div>
            </li>
        </>
    );
}
export default ShoppingCart;