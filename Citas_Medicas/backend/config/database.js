const { Sequelize } = require('sequelize');

// Crear la instancia de Sequelize con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,           // Nombre de la base de datos
  process.env.DB_USER,           // Usuario de la base de datos
  process.env.DB_PASSWORD,       // Contraseña de la base de datos (en blanco si no tienes)
  {
    host: process.env.DB_HOST,   // Host (localhost)
    dialect: 'mysql',            // Usando MySQL como motor de base de datos
  }
);

module.exports = sequelize;
