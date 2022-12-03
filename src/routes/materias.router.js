import express from "express";
import { methods as materiasController } from "../controllers/materias.controller";

const routerMaterias = express.Router();

routerMaterias.get('/', materiasController.getMaterias);
routerMaterias.post('/', materiasController.addMateria);
routerMaterias.patch('/:id', materiasController.updateMateria);
routerMaterias.delete('/:id', materiasController.deleteMateria);

export default routerMaterias;