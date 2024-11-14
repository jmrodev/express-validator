import express, { Request, Response } from "express";
import { checkSchema } from "express-validator";
import { validatorSchema } from "./expressValidators";
import { regexpHandler } from "./regExpHandler";
import { validatorHandler } from "./validatorsHandler";
import { loggerMiddleware } from "./loggerMiddleware";

const app = express();
const port = 3003;

app.use(express.json());
app.use(loggerMiddleware);

// Mensaje de inicio del servidor
console.log('\n=================================');
console.log(`Servidor iniciado ${new Date().toISOString()}`);
console.log('=================================\n');

app.get("/", (_req: Request, res: Response) => {
    console.log('Petición recibida en la ruta raíz');
    res.send("API funcionando correctamente");
});

app.post(
    "/validator",
    checkSchema(validatorSchema),
    validatorHandler
);

app.post("/regexp", regexpHandler);

app.listen(port, () => {
    console.log('\n=================================');
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
    console.log('=================================\n');
});