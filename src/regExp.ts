interface RequestBody {
    name?: string;
    email?: string;
}

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const validateWithRegexp = (body: RequestBody) => {
    const errors: string[] = [];
    
    if (!body.name) {
        errors.push("El nombre es requerido");
    } else if (!NAME_REGEX.test(body.name)) {
        errors.push("El nombre solo puede contener letras y espacios, y debe tener al menos 3 caracteres");
    }
    
    if (!body.email) {
        errors.push("El email es requerido");
    } else if (!EMAIL_REGEX.test(body.email)) {
        errors.push("El formato del email no es válido");
    }
    
    return errors;
};