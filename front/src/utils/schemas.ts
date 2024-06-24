import { z } from 'zod';

const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

export const signUpSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório.'),
    email: z.string().email('Email inválido.'),
    phone: z.string().min(10, 'Número de telefone muito curto.').max(15, 'Número de telefone muito longo.'),
    password: z.string()
        .min(8, 'A senha deve conter pelo menos 8 caracteres.')
        .regex(passwordRegex, 'A senha deve conter uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ['confirmPassword']
});
