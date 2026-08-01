import { Router } from 'express';
import { check } from 'express-validator';
import {
  obtenerColores,
  crearColor,
  obtenerColorPorId,
  editarColor,
  borrarColor
} from '../controllers/colorControllers.js'; 
const router = Router();

router.get('/', obtenerColores);

router.post(
  '/',
  [
    check('nombreColor')
      .notEmpty()
      .withMessage('El nombre del color es un dato obligatorio')
      .isLength({ min: 2, max: 30 })
      .withMessage('El nombre del color debe tener entre 2 y 30 caracteres')
  ],
  crearColor
);

router.get('/:id', obtenerColorPorId);

router.put(
  '/:id',
  [
    check('nombreColor')
      .notEmpty()
      .withMessage('El nombre del color es un dato obligatorio')
      .isLength({ min: 2, max: 30 })
      .withMessage('El nombre del color debe tener entre 2 y 30 caracteres')
  ],
  editarColor
);

router.delete('/:id', borrarColor);

export default router;