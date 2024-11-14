o
# Express Validator

Este proyecto utiliza `express-validator` para validar y sanitizar datos en una aplicación Express.

## Instalación

Para instalar las dependencias necesarias, ejecuta:

```bash
npm install express express-validator
```

## Uso

A continuación se muestra un ejemplo básico de cómo utilizar `express-validator` en una ruta de Express:

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/user', [
    body('username').isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres'),
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('Usuario válido');
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
```

## Validaciones Comunes

- `isEmail()`: Verifica si el campo es un correo electrónico válido.
- `isLength({ min, max })`: Verifica si la longitud del campo está dentro del rango especificado.
- `isNumeric()`: Verifica si el campo contiene solo caracteres numéricos.

## Sanitización

Además de las validaciones, `express-validator` permite sanitizar los datos de entrada:

```javascript
const { sanitizeBody } = require('express-validator');

app.post('/user', [
    sanitizeBody('username').escape(),
    sanitizeBody('email').normalizeEmail()
], (req, res) => {
    // Procesar la solicitud
});
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.