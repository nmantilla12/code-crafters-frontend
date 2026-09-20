// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.email && formData.password.length >= 4) {
      // Guardamos la sesión localmente para que el Navbar la detecte de inmediato
      localStorage.setItem('organizadorUser', JSON.stringify({ 
        email: formData.email, 
        name: formData.email.split('@')[0],
        role: 'organizador', 
        loggedIn: true 
      }));

      // Redirigimos al panel de control
      navigate('/organizer/dashboard');
    } else {
      setErrorMessage('Por favor, introduce un correo válido y una contraseña de al menos 4 caracteres.');
    }
  };

  return (
    <main className="login-page">
      <div className="login-page__card">
        <button 
          type="button" 
          className="login-page__back-btn" 
          onClick={() => navigate('/')}
        >
          ← Volver al inicio
        </button>

        <h1 className="login-page__title">Iniciar Sesión</h1>
        <p className="login-page__subtitle">
          Accede a tu panel de control en Code Crafters.
        </p>

        {errorMessage && (
          <div className="login-page__error">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-page__form">
          <div className="login-page__group">
            <label htmlFor="loginEmail" className="login-page__label">
              Correo electrónico
            </label>
            <input 
              id="loginEmail"
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              placeholder="tu@email.com"
              className="login-page__input"
            />
          </div>

          <div className="login-page__group">
            <label htmlFor="loginPassword" className="login-page__label">
              Contraseña
            </label>
            <input 
              id="loginPassword"
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required
              placeholder="••••••••"
              className="login-page__input"
            />
          </div>

          <button type="submit" className="login-page__submit-btn">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;