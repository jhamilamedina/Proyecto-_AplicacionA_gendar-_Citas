const express = require('express');
const Citas = require('../models/models_Cita');
const router = express.Router();

// Obtener todas las citas
router.get('/citas', async (req, res) => {
    try {
        const citas = await Citas.findAll();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva cita
router.post('/citas', async (req, res) => {
    try {
        const cita = await Citas.create(req.body);
        res.status(201).json(cita);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener una cita específica
router.get('/citas/:id', async (req, res) => {
    try {
        const cita = await Citas.findByPk(req.params.id);
        if (cita) {
            res.json(cita);
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una cita
router.put('/citas/:id', async (req, res) => {
    try {
        const cita = await Citas.findByPk(req.params.id);
        if (cita) {
            await cita.update(req.body);
            res.json(cita);
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar una cita
router.delete('/citas/:id', async (req, res) => {
    try {
        const rowsDeleted = await Citas.destroy({ where: { id: req.params.id } });
        if (rowsDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
