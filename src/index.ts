import express, { Request, Response, RequestHandler } from "express";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3003;

app.use(express.json());

// Validaciones
const validations = [
  body("name")
    .trim() // Elimina espacios en blanco al principio y al final
    .isLength({ min: 3 }) // Valida que tenga al menos 3 caracteres
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .not().isEmpty() // Asegura que no esté vacío ni contenga solo espacios
    .withMessage("El nombre no puede estar vacío o contener solo espacios")
    .escape(), // Escapa caracteres potencialmente peligrosos (prevención XSS)
  
  body("email")
    .isEmail() // Valida que sea un email
    .withMessage("Debe proporcionar un email válido")
    .normalizeEmail() // Normaliza el correo (quita posibles errores como mayúsculas innecesarias)
];

// Manejador de la ruta POST
const postHandler: RequestHandler = (req: Request, res: Response): void => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  const { name, email } = req.body;
  res.json({ message: "Hello", name, email });
}
  app.get("/", (_req: Request, res: Response) => {
    res.send("API funcionando correctamente");
  });

  app.post(
    "/post",
    validations,
    postHandler
  );

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });