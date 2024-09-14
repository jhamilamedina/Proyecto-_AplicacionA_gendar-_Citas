import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CitasMedicas.css'; // Asegúrate de tener tus estilos

const CitasMedicas = () => {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // Estado para manejar el modal
  const [nuevaCita, setNuevaCita] = useState({
    fecha_cita: '',
    hora_cita: '',
    patient_id: '',
    doctor_id: '',
    status: '',
    razon: ''
  });

  useEffect(() => {
    // Llamada a la API para obtener las citas
    const fetchCitas = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/citas'); // Ajusta la URL según tu configuración
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

    // Llamada a la API para obtener los pacientes
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/pacientes'); // Ajusta la URL según tu configuración
        setPacientes(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    // Llamada a la API para obtener los doctores
    const fetchDoctores = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/doctores'); // Ajusta la URL según tu configuración
        setDoctores(response.data);
      } catch (error) {
        console.error('Error al obtener los doctores:', error);
      }
    };

    fetchCitas();
    fetchPacientes();
    fetchDoctores();
  }, []);

  // Crear mapas de ID a nombre para pacientes y doctores
  const pacienteMap = pacientes.reduce((map, paciente) => {
    map[paciente.id] = `${paciente.nombre} ${paciente.apellido}`;
    return map;
  }, {});

  const doctorMap = doctores.reduce((map, doctor) => {
    map[doctor.id] = `${doctor.first_name} ${doctor.last_name}`;
    return map;
  }, {});

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtrar citas basado en el término de búsqueda
  const filteredCitas = citas.filter(cita => {
    const pacienteNombre = pacienteMap[cita.patient_id]?.toLowerCase() || '';
    const doctorNombre = doctorMap[cita.doctor_id]?.toLowerCase() || '';
    return pacienteNombre.includes(searchTerm) || doctorNombre.includes(searchTerm);
  });

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setNuevaCita({ ...nuevaCita, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/citas', nuevaCita); // Ajusta la URL según tu configuración
      setCitas([...citas, nuevaCita]); // Actualizar el estado local con la nueva cita
      setModalOpen(false); // Cerrar el modal
      setNuevaCita({
        fecha_cita: '',
        hora_cita: '',
        patient_id: '',
        doctor_id: '',
        status: '',
        razon: ''
      }); // Limpiar el formulario
    } catch (error) {
      console.error('Error al agregar la cita:', error);
    }
  };

  return (
    <div className="citas-container">
      <h1>Lista de Citas</h1>
      <button className="agregar-cita" onClick={() => setModalOpen(true)}>Agregar cita</button>
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table className="citas-table">
        <thead>
          <tr>
            <th>N° Cita</th>
            <th>Fecha_Cita</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Estado</th>
            <th>Razón</th> {/* Nueva columna para Razón */}
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredCitas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.fecha_cita}</td>
              <td>{cita.hora_cita}</td>
              <td>{pacienteMap[cita.patient_id] || 'Desconocido'}</td>
              <td>{doctorMap[cita.doctor_id] || 'Desconocido'}</td>
              <td>{cita.status}</td>
              <td>{cita.razon || 'No especificado'}</td> {/* Nueva celda para Razón */}
              <td>
                <div className="action-buttons">
                  <button className="editar-btn">Editar</button>
                  <button className="editar-btn1">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h2>Agregar Cita</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Fecha Cita:
                <input
                  type="date"
                  name="fecha_cita"
                  value={nuevaCita.fecha_cita}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Hora:
                <input
                  type="time"
                  name="hora_cita"
                  value={nuevaCita.hora_cita}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Paciente:
                <select
                  name="patient_id"
                  value={nuevaCita.patient_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nombre} {paciente.apellido}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Doctor:
                <select
                  name="doctor_id"
                  value={nuevaCita.doctor_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un doctor</option>
                  {doctores.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.first_name} {doctor.last_name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Estado:
                <input
                  type="text"
                  name="status"
                  value={nuevaCita.status}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Razón:
                <input
                  type="text"
                  name="razon"
                  value={nuevaCita.razon}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Guardar Cita</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitasMedicas;
