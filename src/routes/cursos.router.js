import express from "express";
import { methods as cursosController } from "../controllers/cursos.controller";

const routerCursos = express.Router();

routerCursos.get('/', cursosController.getCursos);
routerCursos.post('/', cursosController.addCurso);
routerCursos.post('/link', cursosController.cursosLinkMaterias);
routerCursos.patch('/:id', cursosController.updateCurso);
routerCursos.delete('/:id', cursosController.deleteCurso);

export default routerCursos;