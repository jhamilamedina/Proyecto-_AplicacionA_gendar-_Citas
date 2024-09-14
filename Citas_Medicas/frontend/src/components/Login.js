import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Usar el hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Cambiar la URL para que apunte a la nueva ruta /login
            const response = await axios.post('http://localhost:5001/api/usuarios/login', { email, password });
            const { role } = response.data;
    
            // Manejar la respuesta según el rol del usuario (puedes ajustar esto según tus necesidades)
            console.log('Rol recibido:', role);
    
            // Limpiar el error y redirigir al usuario según el rol
            setError('');
            if (role === 'admin') {
                navigate('/admin-dashboard'); // Redirige a un dashboard específico para administradores
            } else {
                navigate('/dashboard'); // Redirige a un dashboard general para usuarios
            }
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error del servidor');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
