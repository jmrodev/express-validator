import { Schema } from "express-validator";

export const validatorSchema: Schema = {
    name: {
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: "El nombre debe tener al menos 3 caracteres"
        },
        matches: {
            options: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            errorMessage: "El nombre solo puede contener letras y espacios"
        },
        escape: true,
        customSanitizer: {
            options: (value: string) => {
                return value.toUpperCase();
            }
        }
    },
    email: {
        isEmail: {
            errorMessage: "Debe proporcionar un email válido"
        },
        matches: {
            options: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            errorMessage: "El formato del email no es válido"
        },
        normalizeEmail: true
    }
};