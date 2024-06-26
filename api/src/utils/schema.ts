import joi from 'joi';

const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

export const createUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email(),
    phone: joi.string().required(),
    password: joi.string().regex(passwordRegex).required()
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});