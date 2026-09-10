// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detectamos de forma segura si venimos de la ruta de organizador
  const isOrganizerRoute = location.pathname.includes('organizer');
  const storedRole = localStorage.getItem('userRole');
  const role = isOrganizerRoute ? 'organizer' : (storedRole || 'viewer');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    // Guardamos la sesión con el rol verificado
    const userData = {
      name,
      email,
      role,
      loggedIn: true
    };

    localStorage.setItem('codeCraftersUser', JSON.stringify(userData));
    localStorage.setItem('userRole', role);

    // Redirección estática y definitiva según el rol exacto
    if (role === 'organizer') {
      navigate('/organizer/dashboard');
    } else {
      navigate('/events');
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">
        
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          className="register-back-btn"
        >
          ← Volver al inicio
        </button>

        <h1 className="register-title">
          {role === 'organizer' ? 'Registro de Organizador' : 'Registro de Espectador'}
        </h1>
        
        <p className="register-subtitle">
          {role === 'organizer' 
            ? 'Regístrate para administrar la infraestructura y crear eventos en Code Crafters.' 
            : 'Regístrate para explorar la cartelera, comprar entradas y obtener tus tickets QR.'}
        </p>

        {errorMessage && (
          <p className="register-error-message">
            {errorMessage}
          </p>
        )}

        <div className="register-form">
          <div className="form-group">
            <label htmlFor="registerName">
              {role === 'organizer' ? 'Nombre u Organización' : 'Nombre y Apellidos'}
            </label>
            <input 
              id="registerName"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Tu nombre"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerEmail">Correo electrónico</label>
            <input 
              id="registerEmail"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerPassword">Contraseña</label>
            <input 
              id="registerPassword"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <button 
            type="button" 
            onClick={handleRegister}
            className="register-submit-btn dashboard-large-btn dashboard-large-btn--primary"
          >
            {role === 'organizer' ? 'Registrarse como Organizador' : 'Registrarse como Espectador'}
          </button>
        </div>

      </div>
    </main>
  );
};

export default Register;