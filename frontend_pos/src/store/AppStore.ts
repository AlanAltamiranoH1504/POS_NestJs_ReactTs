import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {ProductoCarrito, ProductoDB} from "../types";

type CarritoState = {
    total: number;
    productosOrder: ProductoCarrito[],

    addProduct: (producto: ProductoDB) => void
    updateQuantity: (idProduct: ProductoCarrito["id"], quantity: ProductoCarrito["cantidad"]) => void,
    removeProduct: (product: ProductoDB) => void
}

export const useCarritoStorage = create<CarritoState>()(devtools((set) => ({
    total: 0,
    productosOrder: [],

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
            return {
                productosOrder: newProducts
            }
        });
    },
    updateQuantity: (idProduct, quantity) => {
        set((state) => {
            const productosOrden = state.productosOrder.map((p) => p.id === idProduct ?
                {...p, cantidad: quantity} : p);
            return {
                productosOrder: productosOrden
            }
        });

    },
    removeProduct: (producto: ProductoDB) => {
        set((state) => {
            const newProducts = state.productosOrder.filter((p) => {
                return p.id !== producto.id;
            });
            return {
                productosOrder: newProducts
            }
        });
    }
})));