import express from "express";
import routerCursos from "./cursos.router";
import routerMaterias from "./materias.router";
import routerEstudiantes from "./estudiantes.router";
import routerNotas from "./notas.router"

function routerApi(app) {

    const router = express.Router();
    app.use('/api', router);

    router.use('/cursos', routerCursos);
    router.use('/materias', routerMaterias);
    router.use('/estudiantes', routerEstudiantes);
    router.use('/notas', routerNotas);
}

export default routerApi;