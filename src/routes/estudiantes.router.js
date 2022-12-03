import express from "express";
import { methods as estudiantesController } from "../controllers/estudiantes.controller";

const routerEstudiantes = express.Router();

routerEstudiantes.get('/', estudiantesController.getEstudiantes);
routerEstudiantes.post('/', estudiantesController.addEstudiante);
routerEstudiantes.patch('/:id', estudiantesController.updateEstudiante);
routerEstudiantes.delete('/:id', estudiantesController.deleteEstudiante);

export default routerEstudiantes;