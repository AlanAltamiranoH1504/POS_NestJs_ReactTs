import z from "zod";
import {responseAplyCuponAPI} from "../schemas/CuponesScgemas";

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
export type FormCupon = {
    slug: string;
}