import React from 'react';
//import { Link } from 'react-router-dom';
import CircularButton from './CircularButton';
import './Dashboard.css'; 

const Dashboard = () => {
    return (
      <div className="dashboard-container">
        <h1>Clinica Angloamericana</h1>
        
        <div className="button-container">
          
          <CircularButton imageSrc="/imagen1.jpg" altText="Citas" to="/citas" label="Citas" />
          <CircularButton imageSrc="/imagen2.jpg" altText="Especialidades" to="/especialidades" label="Especialidades"/>
          <CircularButton imageSrc="/imagen3.jpg" altText="Pacientes" to="/pacientes" label="Pacientes" />
          <CircularButton imageSrc="/imagen4.jpg" altText="Horarios" to="/horarios" label="Horarios de Atención" />
          <CircularButton imageSrc="/imagen5.jpg" altText="Doctores" to="/doctores" label="Doctores" />
        </div>
      </div>
    );
  };
  
  export default Dashboard;
