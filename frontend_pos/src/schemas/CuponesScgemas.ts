import z from "zod";

export const responseAplyCuponAPI = z.object({
    cupon: z.object({
        id: z.number(),
        nombre: z.string(),
        slug: z.string(),
        porcentaje: z.number(),
        fecha_expiracion: z.string(),
        status: z.boolean()
    })
});