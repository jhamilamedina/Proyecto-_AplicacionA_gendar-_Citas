require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');

// Configurar Sequelize con las variables de entorno
const sequelize = new Sequelize("DBClinica", "root", "123", {
    host: "localhost",
    dialect: "mysql",  // Usar 'mysql' como valor por defecto si DB_DIALECT no está definido
    port: 3306,
});

// Exportar `sequelize` para que esté disponible en otros archivos
module.exports = sequelize;

// Rutas
const citasRouter = require('./router/RouterCitas');
const disponibilidadRouter = require('./router/RouterDisponibilidad');
const doctoresRouter = require('./router/RouterDoctor');
const especialidadesRouter = require('./router/RouterEspecialidades');
const pacientesRouter = require('./router/RouterPacientes');
const usuarioRouter = require('./router/RouterUsuarios');
const authRouter = require('./router/authRouter');

// Middlewares
const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware');  // Corregido el path del middleware

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
    origin: ['http://localhost:3000', 'http://example.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());

// Rutas
app.use('/api/auth', authRouter);  // Ruta pública para autenticación (login y registro)
app.use('/api/citas', authMiddleware, citasRouter);  // Ruta protegida para citas
app.use('/api/disponibilidad', authMiddleware, disponibilidadRouter);  // Ruta protegida para disponibilidad
app.use('/api/especialidades', authMiddleware, especialidadesRouter);  // Ruta protegida para especialidades
app.use('/api/pacientes', authMiddleware, pacientesRouter);  // Ruta protegida para pacientes
app.use('/api/doctores', authMiddleware, adminMiddleware, doctoresRouter);  // Ruta protegida y con autorización de admin para doctores
app.use('/api/usuarios', authMiddleware, adminMiddleware, usuarioRouter);  // Ruta protegida y con autorización de admin para usuarios

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal' });
});

// Sincronización con la base de datos y levantamiento del servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Unable to connect to the database:', error));
