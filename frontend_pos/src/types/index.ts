import z from "zod";
import {responseAplyCuponAPI} from "../schemas/CuponesScgemas";
import {responseFindAllProductos} from "../schemas/ProductosSchemas";

export type ProductoDB = {
    id: number;
    nombre: string;
    imagen: string;
    precio: string;
    inventario: number;
}

export type ProductoCarrito = {
    id: number;
    nombre: string;
    imagen: string;
    precio: string;
    inventario: number;
    cantidad: number;
    total: number
}

export type CategoriaDB = {
    id: number;
    nombre: string;
    productos: ProductoDB[];
}


export type CupongDB = z.infer<typeof responseAplyCuponAPI>
export type Categoria = Pick<CategoriaDB, "id" | "nombre">
export type ProductosFindAll = {
    categoria_id: number;
    page: string;
    take: string;
}
export type ProductosFindAllInfer = z.infer<typeof responseFindAllProductos>
export type FormCupon = {
    slug: string;
}
export type FormCreateProducto = {
    nombre: string;
    precio: string,
    inventario: string;
    categoriaId: string;
    imagen: File
}
export type FormUpdateProducto = {
    nombre: string;
    precio: string;
    inventario: string;
    categoriaId: string;
    id: number;
    imagen: File
}