import { getConnection } from "../database/database";

const getMaterias = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM materias");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addMateria = async (req, res) => {
    try {
        const { nombre_materia, id_tutor } = req.body;

        if(!nombre_materia || !id_tutor) {
            res.status(400).json({ message: "Bad request, please fill all field"});
        }

        const materia = { nombre_materia, id_tutor };
        const connection = await getConnection();
        await connection.query("INSERT INTO materias SET ?", materia);

        res.json({ message: "Materia added", materia});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_materia, id_tutor } = req.body;

        if(!id || !nombre_materia || !id_tutor) {
            res.status(400).json({ message: "Bad request, please fill all field"});
        }

        const materia = { nombre_materia, id_tutor };
        const connection = await getConnection();
        await connection.query("UPDATE materias SET ? WHERE id= ?", [materia, id]);

        res.json({message: "Materia updated!", new_materia: materia, id: id})
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteMateria = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            res.status(400).json({ message: "Bad request, please fill all field" });
        }

        const connection = await getConnection();
        await connection.query("DELETE FROM materias WHERE id = ?", id);

        res.json({ message: "Materia deleted...", id});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getMaterias,
    addMateria,
    updateMateria,
    deleteMateria,
}