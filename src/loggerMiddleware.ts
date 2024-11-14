import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;

    console.log('\n=================================');
    console.log(`[${timestamp}] ${method} ${url}`);
    console.log('IP:', ip);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    
    // Capturar el momento en que se envía la respuesta
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`Respuesta enviada - Status: ${res.statusCode}`);
        console.log(`Duración: ${duration}ms`);
        console.log('=================================\n');
    });

    const startTime = Date.now();
    next();
};