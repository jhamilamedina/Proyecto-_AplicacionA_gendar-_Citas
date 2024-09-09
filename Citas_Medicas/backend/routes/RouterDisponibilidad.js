const express = require('express');
const Disponibilidad = require('../models/models_disponibilidad');  // Asegúrate de que el modelo Disponibilidad está definido
const router = express.Router();

// Obtener la disponibilidad de todos los doctores
router.get('/disponibilidad', async (req, res) => {
    try {
        const disponibilidad = await Disponibilidad.findAll();
        res.json(disponibilidad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener la disponibilidad de un doctor específico
router.get('/disponibilidad/:doctorId', async (req, res) => {
    try {
        const disponibilidad = await Disponibilidad.findAll({ where: { doctor_id: req.params.doctorId } });
        if (disponibilidad.length > 0) {
            res.json(disponibilidad);
        } else {
            res.status(404).json({ error: 'Disponibilidad no encontrada para este doctor' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear o actualizar la disponibilidad de un doctor
router.post('/disponibilidad', async (req, res) => {
    try {
        // Crear nueva disponibilidad o actualizar si ya existe
        const [disponibilidad, created] = await Disponibilidad.upsert(req.body, {
            returning: true
        });
        res.status(created ? 201 : 200).json(disponibilidad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
