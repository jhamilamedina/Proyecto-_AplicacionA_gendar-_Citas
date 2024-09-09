// Modelo (Usuarios)
const Usuario = sequelize.define('Usuario', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
  },
  password: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
  },
  role: {
      type: DataTypes.ENUM('admin', 'usuario'),
      defaultValue: 'usuario',
  },
  fecha_creacion: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
});

// Relaciones
Citas.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Citas.belongsTo(Paciente, { foreignKey: 'patient_id' });
Doctor.belongsTo(Especialidad, { foreignKey: 'specialty_id' });
Paciente.belongsTo(Usuario, { foreignKey: 'user_id' });
Doctor.belongsTo(Usuario, { foreignKey: 'user_id' });

module.exports = Usuario;
