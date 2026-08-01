import Color from '../models/color.js'; 
import { validationResult } from 'express-validator';


export const obtenerColores = async (req, res) => {
  try {
    const colores = await Color.find();
    res.status(200).json(colores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al buscar la lista de colores" });
  }
};


export const crearColor = async (req, res) => {
  try {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const colorNuevo = new Color(req.body);
    await colorNuevo.save();

    res.status(201).json({
      mensaje: "El color fue creado exitosamente",
      color: colorNuevo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al intentar crear el color" });
  }
};


export const obtenerColorPorId = async (req, res) => {
  try {
    const colorBuscado = await Color.findById(req.params.id);
    
    if (!colorBuscado) {
      return res.status(404).json({ mensaje: "El color solicitado no fue encontrado" });
    }

    res.status(200).json(colorBuscado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al buscar el color" });
  }
};


export const editarColor = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const colorBuscado = await Color.findById(req.params.id);
    if (!colorBuscado) {
      return res.status(404).json({ mensaje: "El color solicitado no existe para editar" });
    }

    await Color.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "El color fue editado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al intentar editar el color" });
  }
};


export const borrarColor = async (req, res) => {
  try {
    const colorBuscado = await Color.findById(req.params.id);
    if (!colorBuscado) {
      return res.status(404).json({ mensaje: "El color solicitado no fue encontrado para borrar" });
    }

    await Color.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "El color fue eliminado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al intentar eliminar el color" });
  }
};