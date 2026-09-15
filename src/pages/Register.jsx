// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('organizer');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (location.pathname.includes('organizer')) {
      setRole('organizer');
      localStorage.setItem('userRole', 'organizer');
    } else {
      const savedRole = localStorage.getItem('userRole');
      if (savedRole) {
        setRole(savedRole);
      } else {
        localStorage.setItem('userRole', 'organizer');
      }
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validación sencilla en el frontend
    if (!formData.name || !formData.email || formData.password.length < 4) {
      setErrorMessage('Por favor, completa todos los campos (Contraseña mínima de 4 caracteres).');
      return;
    }

    // Guardamos los datos directamente en el localStorage del navegador
    setSuccessMessage(true);
    
    localStorage.setItem('codeCraftersUser', JSON.stringify({ 
      name: formData.name, 
      email: formData.email, 
      role: role,
      loggedIn: true 
    }));
    localStorage.setItem('userRole', role);

    // Redirigimos al panel de organización tras un breve instante
    setTimeout(() => {
      navigate('/organizer/dashboard');
    }, 1200);
  };

  return (
    <main className="register-page">
      <div className="register-card">
        
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          className="register-back-btn"
        >
          ← Volver al inicio
        </button>

        <h1 className="register-title">Registro de Organizador</h1>
        <p className="register-subtitle">Regístrate para administrar la infraestructura y crear eventos en Code Crafters.</p>

        {errorMessage && (
          <p className="register-error-msg" role="alert">
            {errorMessage}
          </p>
        )}

        {successMessage ? (
          <p className="register-success-msg" role="alert">
            ¡Organizador registrado con éxito! Redirigiendo al panel... 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <div className="register-form__group">
              <label className="register-form__label" htmlFor="registerName">
                Nombre u Organización
              </label>
              <input 
                className="register-form__input"
                id="registerName"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>

            <div className="register-form__group">
              <label className="register-form__label" htmlFor="registerEmail">
                Correo electrónico
              </label>
              <input 
                className="register-form__input"
                id="registerEmail"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </div>

            <div className="register-form__group">
              <label className="register-form__label" htmlFor="registerPassword">
                Contraseña
              </label>
              <input 
                className="register-form__input"
                id="registerPassword"
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <button 
              type="submit"
              className="register-form__submit-btn"
            >
              Registrarse como Organizador
            </button>
          </form>
        )}

      </div>
    </main>
  );
};

export default Register;