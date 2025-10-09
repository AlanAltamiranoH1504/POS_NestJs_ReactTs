import z from "zod";

export const responseFindAllProductos = z.object({
    data: z.array(
        z.object({
            id: z.number(),
            nombre: z.string(),
            imagen: z.string(),
            precio: z.string(),
            inventario: z.number(),
            categoria: z.object({
                id: z.number(),
                nombre: z.string(),
            })
        })
    ),
    total: z.number(),
});

export const responseCreateProducto = z.object({
    status: z.boolean(),
    message: z.string(),
});
export const responseDeleteProducto = z.object({
    status: z.boolean(),
    message: z.string(),
});
export const responseFindProducto = z.object({
    id: z.number(),
    nombre: z.string(),
    imagen: z.string(),
    precio: z.string(),
    inventario: z.number(),
    categoria: z.object({
        id: z.number(),
        nombre: z.string(),
    })
})