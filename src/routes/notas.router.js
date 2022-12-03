import express from "express";

const routerNotas = express.Router();

routerNotas.get('/', (req, res) => {
    res.json({
        message: 'notas router'
    });
});

routerNotas.post('/', (req, res) => {
    const body = req.body;

    res.json(body);
});

routerNotas.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    res.json({
        message: 'updated!',
        body: body
    });
});

routerNotas.delete('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: 'deleted',
        id
    })
});

export default routerNotas;