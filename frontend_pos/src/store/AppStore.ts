import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {CupongDB, ProductoCarrito, ProductoDB} from "../types";

type CarritoState = {
    total: number;
    productosOrder: ProductoCarrito[],
    cuponApply: CupongDB,
    discountAmount: number,

    addProduct: (producto: ProductoDB) => void
    updateQuantity: (idProduct: ProductoCarrito["id"], quantity: ProductoCarrito["cantidad"]) => void,
    removeProduct: (product: ProductoDB) => void,
    addCupon: (cupon: CupongDB) => void,
    deleteOrden: () => void,
}

export const useCarritoStorage = create<CarritoState>()(devtools((set, get) => ({
    total: 0,
    productosOrder: [],
    cuponApply: {},
    discountAmount: 0,

    addProduct: (producto) => {
        const productoCarrito: ProductoCarrito = {
            ...producto,
            cantidad: 1,
            total: +producto.precio
        }

        set((state) => {
            const productExists = state.productosOrder.find((product) => {
                return product.id === producto.id;
            })
            let newProducts: ProductoCarrito[];

            if (productExists) {
                newProducts = state.productosOrder.map((p) =>
                    p.id === producto.id ? {
                        ...p, cantidad: p.cantidad + 1, total: +p.total + +producto.precio
                    } : p
                );
            } else {
                newProducts = [...state.productosOrder, productoCarrito];
            }
            const total = newProducts.reduce((acum, p) => {
                return acum + (p.cantidad * +p.precio);
            }, 0)
            return {
                productosOrder: newProducts,
                total
            }
        });
    },
    updateQuantity: (idProduct, quantity) => {
        set((state) => {
            const productosOrden = state.productosOrder.map((p) => p.id === idProduct ?
                {...p, cantidad: quantity} : p);
            const total = productosOrden.reduce((acum, product) => {
                return acum + (product.cantidad * +product.precio);
            }, 0)
            return {
                productosOrder: productosOrden,
                total
            }
        });

    },
    removeProduct: (producto: ProductoDB) => {
        set((state) => {
            const newProducts = state.productosOrder.filter((p) => {
                return p.id !== producto.id;
            });
            const total = newProducts.reduce((acum, product) => {
                return acum + (product.cantidad * +product.precio);
            }, 0)
            return {
                productosOrder: newProducts,
                total
            }
        });
    },
    addCupon: (cupon) => {
        const percentageCupon = cupon.cupon.porcentaje;
        const discountAmount: number = get().total * (percentageCupon / 100);
        set((state) => {
            const newTotal = state.total - discountAmount;
            return {
                total: newTotal,
                discountAmount,
                cuponApply: cupon
            }
        });
    },
    deleteOrden: () => {
        set(() => {
            return {
                productosOrder: [],
                cuponApply: undefined,
                discountAmount: 0,
                total: 0
            }
        });
    }
})));