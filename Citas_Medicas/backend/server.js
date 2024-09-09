const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Asegúrate que la configuración esté en este archivo
const appointmentRoutes = require('./routes/RouterCitas'); // Rutas de tu API
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', appointmentRoutes);

// Sincronización con la base de datos y levantamiento del servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Unable to connect to the database:', error));
