import { z } from "zod";

export const SingupValidation = z.object({
    name: z.string().min(2,{message: 'To short!'}),
    username: z.string().min(2, {message: 'To short!'}),
    email:z.string().email(),
    password:z.string().min(8, {message:'Password must be at least 8 charachter!'}),
})