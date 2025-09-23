export type ProductoDB = {
    id: number;
    nombre: string;
    imagen: string;
    precio: string;
    inventario: number;
}

export type CategoriaDB = {
    id: number;
    nombre: string;
    productos: ProductoDB[];
}
export type Categoria = Pick<CategoriaDB, "id" | "nombre">