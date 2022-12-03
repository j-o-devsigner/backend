import { getConnection } from "../database/database";

const getEstudiantes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM estudiantes");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addEstudiante = async (req, res) => {
    try {
        const { nombre_completo, curso_perteneciente } = req.body;

        if (!nombre_completo) {
            res.status(400).json({ message: "Bad request, please fill all field" });
        }

        const estudiante = { nombre_completo, curso_perteneciente };
        const connection = await getConnection();
        await connection.query("INSERT INTO estudiantes SET ?", estudiante);

        res.json({ message: "Estudiante created!", estudiante: estudiante })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, curso_perteneciente, estado } = req.body;

        if (id && nombre_completo && curso_perteneciente) {

            const estudiante = { nombre_completo, curso_perteneciente }
            const connection = await getConnection();

            const cursoId = await connection.query("SELECT curso_perteneciente FROM estudiantes WHERE id = ?", id);
            await connection.query("DELETE FROM notas_cursos_estudiantes_combinacion WHERE id_estudiante = ? AND id_curso = ? ", [id, cursoId[0].curso_perteneciente])

            await connection.query("UPDATE estudiantes SET curso_perteneciente = ? WHERE id = ?", [curso_perteneciente, id]);

            await connection.query("UPDATE estudiantes SET ? WHERE id = ?", [estudiante, id]);

            res.json({ message: "Estudiante updated!", estudiante: estudiante, id: id });
        } else if (id && nombre_completo) {

            const connection = await getConnection();
            await connection.query("UPDATE estudiantes SET nombre_completo = ? WHERE id = ?", [nombre_completo, id]);

            res.json({ message: "Name estudiante updated!", nombre: nombre_completo, id: id });
        } else if (id && curso_perteneciente) {

            const connection = await getConnection();

            const cursoId = await connection.query("SELECT curso_perteneciente FROM estudiantes WHERE id = ?", id);
            await connection.query("DELETE FROM notas_cursos_estudiantes_combinacion WHERE id_estudiante = ? AND id_curso = ? ", [id, cursoId[0].curso_perteneciente])

            await connection.query("UPDATE estudiantes SET curso_perteneciente = ? WHERE id = ?", [curso_perteneciente, id]);

            res.json({ message: "Curso estudiante updated!", nombre: curso_perteneciente, id: id });
        } else if (id && estado) {

            const connection = await getConnection();
            await connection.query("UPDATE estudiantes SET estado = ? WHERE id = ?", [estado, id]);

            res.json({ message: "Estado estudiante updated!", estado: estado, id: id });
        } else if (!id) {
            res.status(400).json({ message: "No id to work..." });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Bad request, please fill all field" });
        }
        const connection = await getConnection();
        await connection.query("DELETE FROM estudiantes WHERE id = ?", id);

        res.json({ message: "Estudiante deleted!", id: id});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getEstudiantes,
    addEstudiante,
    updateEstudiante,
    deleteEstudiante,
};