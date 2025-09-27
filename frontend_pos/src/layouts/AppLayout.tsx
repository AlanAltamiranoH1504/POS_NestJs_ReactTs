import {Outlet} from "react-router-dom";
import MainNav from "../components/MainNav";
import ShoppingCart from "../components/cart/ShoppingCart";
import {useCarritoStorage} from "../store/AppStore";
import {formatoMoneda} from "../helpers";

const AppLayout = () => {
    const {productosOrder} = useCarritoStorage();
    const totalOrdern = productosOrder.reduce((acumulador, producto) => {
        return acumulador += producto.cantidad * Number(producto.precio);
    }, 0);
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
                        className="mt-6 divide-y divide-gray-600 border-t border-gray-200 text-sm font-bold">
                        {productosOrder.length > 0 ? (
                            productosOrder.map((producto) => (
                                <ShoppingCart
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))
                        ) : (
                            <h2 className="text-center my-5 font-semibold">Carrito vacio</h2>
                        )}
                        <h2 className="font-bold text-center text-2xl">Total de Orden: {formatoMoneda(totalOrdern)}</h2>
                    </ul>
                </aside>
            </main>
        </>
    );
}
export default AppLayout;