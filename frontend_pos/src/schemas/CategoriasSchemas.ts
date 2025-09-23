import z  from "zod";
export const findByIdResponseAPI = z.object({
    id: z.number(),
    nombre: z.string(),
    productos: z.array(
        z.object({
            id: z.number(),
            nombre: z.string(),
            imagen: z.string(),
            precio: z.string(),
            inventario: z.number()
        })
    )
});