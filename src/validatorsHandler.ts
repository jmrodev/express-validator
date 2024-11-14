import { Request, Response, RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validatorHandler: RequestHandler = (req: Request, res: Response): void => {
    console.log('\n--- Petición en /validator ---');
    console.log('Body recibido:', req.body);
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array();
        console.log('Errores de validación:', errors);
        res.status(400).json({ errors });
        return;
    }
    
    const { name, email } = req.body;
    const response = { 
        message: "Validado con express-validator", 
        name, 
        email 
    };
    
    console.log('Respuesta enviada:', response);
    res.json(response);
}