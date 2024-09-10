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

const citasRouter = require('./router/RouterCitas');
const disponibilidadRouter = require('./router/RouterDisponibilidad');
const doctoresRouter = require('./router/RouterDoctor');
const especialidadesRouter = require('./router/RouterEspecialidades');
const pacientesRouter = require('./router/RouterPacientes');
const usuarioRouter = require('./router/RouterUsuarios');


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
app.use('/api/citas', citasRouter);
app.use('/api/disponibilidad', disponibilidadRouter);
app.use('/api/especialidades', especialidadesRouter);
app.use('/api/pacientes', pacientesRouter);
app.use('/api/doctores', doctoresRouter);
app.use('/api/usuarios', usuarioRouter)

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
