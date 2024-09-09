const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

// Modelo Citas (Citas)
const Citas = sequelize.define('Citas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_cita: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hora_cita: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('programado', 'cancelado', 'terminado'),
        defaultValue: 'programado',
    },
    razon: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fecha_creacion: {
        type: DataTypes.TIMESTAMP,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'Citas', // Nombre de la tabla en la BD
    timestamps: false,  // Si no quieres que Sequelize añada columnas `createdAt` y `updatedAt`
});

module.exports = Citas;
