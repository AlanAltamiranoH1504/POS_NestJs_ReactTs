import {Outlet} from "react-router-dom";
import MainNav from "../components/MainNav";
import ShoppingCart from "../components/cart/ShoppingCart";
import {useCarritoStorage} from "../store/AppStore";
import {formatoMoneda} from "../helpers";
import CuponForm from "../components/cart/CuponForm";
import SubmitOrder from "../components/cart/SubmitOrder";

const AppLayout = () => {
    const {productosOrder, total, discountAmount, deleteOrden} = useCarritoStorage();
    return (
        <>
            <MainNav/>
            <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
                <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
                    <Outlet/>
                </div>
                <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 ">
                    <h2 className="text-4xl font-bold text-gray-900 text-center">Resumen de Venta</h2>
                    <ul role={"list"}
                        className="mt-6 divide-y space-y-3 divide-gray-600 border-t border-gray-200 text-sm font-bold">
                        {productosOrder.length > 0 ? (
                            <>
                                {productosOrder.map((producto) => (
                                    <ShoppingCart
                                        key={producto.id}
                                        producto={producto}
                                    />
                                ))}
                                <CuponForm/>
                                <p className={discountAmount > 0 ? "py-5 font-bold text-red-600": "py-5 font-bold"}>Monto de descuento: {formatoMoneda(discountAmount)}</p>
                                <h2 className="font-bold text-center text-2xl text-green-600">Total de Orden: {formatoMoneda(total)}</h2>
                                <SubmitOrder/>
                                <button
                                    onClick={() => {
                                        deleteOrden();
                                    }}
                                    className="w-full  py-2 text-center uppercase text-white bg-red-600 hover:bg-red-700 transition-colors duration-500 rounded-lg">Eliminar Orden</button>
                            </>
                        ) : (
                            <h2 className="text-center my-5 font-semibold">Carrito vacio</h2>
                        )}
                    </ul>
                </aside>
            </main>
        </>
    );
}
export default AppLayout;