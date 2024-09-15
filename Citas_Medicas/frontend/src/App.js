import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CitasMedicas from './components/CitasMedicas';
import Especialidades from './components/Especialidades';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/citas' element={<CitasMedicas />} />
                    <Route path='/especialidades' element={<Especialidades />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
