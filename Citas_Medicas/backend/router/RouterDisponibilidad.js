const express = require('express');
const Disponibilidad = require('../models/models_disponibilidad');  // Asegúrate de que el modelo Disponibilidad está definido
const router = express.Router();

// Obtener todas las disponibilidades
router.get('/', async (req, res) => {
    try {
        const disponibilidades = await Disponibilidad.findAll();
        res.json(disponibilidades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva disponibilidad
router.post('/', async (req, res) => {
    try {
        const disponibilidad = await Disponibilidad.create(req.body);
        res.status(201).json(disponibilidad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener una disponibilidad específica por ID
router.get('/:id', async (req, res) => {
    try {
        const disponibilidad = await Disponibilidad.findByPk(req.params.id);
        if (disponibilidad) {
            res.json(disponibilidad);
        } else {
            res.status(404).json({ error: 'Disponibilidad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una disponibilidad específica por ID
router.put('/:id', async (req, res) => {
    try {
        const disponibilidad = await Disponibilidad.findByPk(req.params.id);
        if (disponibilidad) {
            await disponibilidad.update(req.body);
            res.json(disponibilidad);
        } else {
            res.status(404).json({ error: 'Disponibilidad no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar una disponibilidad específica por ID
router.delete('/:id', async (req, res) => {
    try {
        const rowsDeleted = await Disponibilidad.destroy({ where: { id: req.params.id } });
        if (rowsDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Disponibilidad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
