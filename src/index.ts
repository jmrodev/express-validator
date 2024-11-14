import express, { Request, Response, RequestHandler } from "express";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3003;

app.use(express.json());

// Validaciones
const validations = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Debe proporcionar un email válido")
    .normalizeEmail()
];

// Manejador de la ruta POST
const postHandler: RequestHandler = (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }

  console.log("Datos recibidos:", req.body);
  return res.status(200).json({
    success: true,
    message: "Datos validados correctamente",
    data: req.body
  });
};

app.get("/", (_req: Request, res: Response) => {
  res.send("API funcionando correctamente");
});

app.post("/post", validations, postHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});