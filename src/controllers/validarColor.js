import { check, validationResult } from 'express-validator';

export const validacionColor = [
  check('nombreColor')
    .trim()
    .notEmpty()
    .withMessage('El nombre del color es obligatorio')
    .isLength({ min: 2, max: 30 })
    .withMessage('El nombre debe tener entre 2 y 30 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s#0-9]+$/)
    .withMessage('El color solo puede contener letras, números o códigos hexadecimales'),
  
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];