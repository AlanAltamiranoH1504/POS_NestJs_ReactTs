import z from "zod";

export const responseCreateTransaccionAPI = z.object({
    status: z.boolean(),
    message: z.string(),
});