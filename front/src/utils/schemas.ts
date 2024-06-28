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

export const loginSchema = z.object({
    email: z.string().email('Entre com um email válido.'),
    password: z.string()
});

const baseUpdateProfileSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório.'),
    email: z.string().email('Email inválido.'),
    phone: z.string().min(10, 'Número de telefone muito curto.').max(15, 'Número de telefone muito longo.'),
    password: z.string(),
    confirmPassword: z.string()
});

export const updateProfileSchema = baseUpdateProfileSchema.superRefine((data, schema) => {
    const { password, confirmPassword } = data;
    if(password.length > 0) {
        if(!passwordRegex.test(password)){
            schema.addIssue({  
                code: z.ZodIssueCode.custom,
                message: 'A senha deve conter uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
                path: ['password']
            });
        } else {
            if(password !== confirmPassword) {
                schema.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'As senhas devem ser iguais.',
                    path: ['confirmPassword']
                });
            }
        }
    }
});

export const trackingSchema = z.object({
    vehicleName: z.string().min(1, 'Nome é obrigatório').max(50, 'O tamanho máximo para o nome do veículo é de 50 caracteres.'),
    vehiclePlate: z.string().min(5, 'Tamanho mínimo de placa padrão é 5 caracteres').max(8, 'O tamanho máximo para a placa do veículo é de 8 caracteres.'),
    description: z.string().max(100, 'O tamanho máximo para a descrição do rastreio é de 100 caracteres.')
});