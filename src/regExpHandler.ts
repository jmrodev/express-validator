import { Request, Response, RequestHandler } from "express";
import { validateWithRegexp } from "./regExp";

export const regexpHandler: RequestHandler = (req: Request, res: Response): void => {
    console.log('\n--- Petición en /regexp ---');
    console.log('Body recibido:', req.body);
    
    const errors = validateWithRegexp(req.body);
    
    if (errors.length > 0) {
        console.log('Errores encontrados:', errors);
        res.status(400).json({ errors });
        return;
    }
    
    const { name, email } = req.body;
    const response = { 
        message: "Validado con RegExp", 
        name: name.toUpperCase(), 
        email: email.toLowerCase()
    };
    
    console.log('Respuesta enviada:', response);
    res.json(response);
}