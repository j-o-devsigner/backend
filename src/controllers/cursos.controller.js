import { json } from "express";
import { getConnection } from "../database/database";

const getCursos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM cursos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addCurso = async (req, res) => {
    try {
        const { nombre_curso} = req.body;

        if (!nombre_curso) {
            res.status(400).json({ message: "Bad request, please fill all field" });
        }

        const curso = { nombre_curso }
        const connection = await getConnection();
        await connection.query("INSERT INTO cursos SET ?", curso);

        res.json({ message: "Curso added", curso});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const cursosLinkMaterias = async (req, res) => {
    const { curso, materia } = req.body;

    if(curso && materia) {
        const connection = await getConnection();

        const resultCurso = await connection.query("SELECT id FROM cursos WHERE nombre_curso = ?", curso);
        const resultMateria = await connection.query("SELECT id FROM materias WHERE nombre_materia = ?", materia);

        const id_curso = resultCurso[0].id;
        const id_materia = resultMateria[0].id;

        if(id_curso && id_materia) {
            const link = { id_curso, id_materia }

            const result = await connection.query("INSERT INTO cursos_materias SET ?", link);
            res.json({ message: "Successfull", result });
        }
    }
}

const updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_curso } = req.body;

        if (id === undefined || nombre_curso === undefined) {
            res.status(400).json({ message: "Bad request, please fill all field" });
        }

        const curso = { nombre_curso }
        const connection = await getConnection();
        const result = await connection.query("UPDATE cursos SET ? WHERE id = ?", [ curso, id ]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;

        if (id === undefined) {
            res.status(400).json({ message: "Bad request, please fill all field" });
        }

        const connection = await getConnection();
        await connection.query("DELETE FROM cursos WHERE id = ?", id);
        res.json({ message: "Curso eliminado", id_curso: id});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getCursos,
    addCurso,
    updateCurso,
    deleteCurso,
    cursosLinkMaterias
}