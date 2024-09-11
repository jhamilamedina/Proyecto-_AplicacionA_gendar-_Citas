const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/models_usuarios'); // Modelo de Usuario
const router = express.Router();

// Definir la clave secreta para JWT
const JWT_SECRET = 'S3cr3tK3y$L0ng&Comp!ex';  // Define la clave directamente

// Ruta para autenticar y generar token JWT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña ingresada coincide con la almacenada en la base de datos
        const passwordValid = bcrypt.compareSync(password, usuario.password);
        if (!passwordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Crear token JWT con los datos del usuario
        const token = jwt.sign({
            id: usuario.id,
            role: usuario.role
        }, JWT_SECRET, { expiresIn: '1h' });  // Token válido por 1 hora

        // Respuesta exitosa con el token
        res.json({ token });
    } catch (error) {
        // Manejo de errores del servidor
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
