// src/componentes/ArchitectureSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArchitectureSection = () => {
  const navigate = useNavigate();

  // Estados independientes y limpios para cada tarjeta
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPassword, setOrgPassword] = useState('');

  const [viewName, setViewName] = useState('');
  const [viewEmail, setViewEmail] = useState('');
  const [viewPassword, setViewPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleOrganizerRegister = () => {
    setErrorMessage('');

    if (!orgName.trim() || !orgEmail.trim() || !orgPassword.trim()) {
      setErrorMessage('Por favor, completa todos los campos del organizador.');
      return;
    }

    // Guardamos los datos asegurando el rol de organizador
    const userData = {
      name: orgName,
      email: orgEmail,
      role: 'organizer',
      loggedIn: true
    };

    localStorage.setItem('userRole', 'organizer');
    localStorage.setItem('codeCraftersUser', JSON.stringify(userData));
    
    // Redirigimos al panel o a la gestión de eventos unificada
    navigate('/events');
  };

  const handleViewerRegister = () => {
    setErrorMessage('');

    if (!viewName.trim() || !viewEmail.trim() || !viewPassword.trim()) {
      setErrorMessage('Por favor, completa todos los campos del espectador.');
      return;
    }

    // Guardamos los datos asegurando el rol de espectador
    const userData = {
      name: viewName,
      email: viewEmail,
      role: 'viewer',
      loggedIn: true
    };

    localStorage.setItem('userRole', 'viewer');
    localStorage.setItem('codeCraftersUser', JSON.stringify(userData));
    
    navigate('/events');
  };

  return (
    <section className="architecture-section" id="architecture">
      <div className="architecture-section__grid">
        
        {errorMessage && (
          <p className="architecture-error-message" style={{ gridColumn: '1 / -1', color: '#ff6b6b', textAlign: 'center', fontWeight: 'bold' }}>
            {errorMessage}
          </p>
        )}

        {/* TARJETA 1: REGISTRO ORGANIZADOR */}
        <div className="architecture-card architecture-card--organizer card-border-interactive">
          <h3 className="architecture-card__heading">Registro de Organizador</h3>

          <div className="architecture-form register-form">
            <div className="form-group">
              <label htmlFor="org-name-input">Nombre u Organización</label>
              <input 
                id="org-name-input"
                type="text" 
                value={orgName} 
                onChange={(e) => setOrgName(e.target.value)} 
                placeholder="Tu nombre o empresa"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="org-email-input">Correo electrónico</label>
              <input 
                id="org-email-input"
                type="email" 
                value={orgEmail} 
                onChange={(e) => setOrgEmail(e.target.value)} 
                placeholder="organizador@email.com"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="org-pass-input">Contraseña</label>
              <input 
                id="org-pass-input"
                type="password" 
                value={orgPassword} 
                onChange={(e) => setOrgPassword(e.target.value)} 
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <button 
              type="button" 
              onClick={handleOrganizerRegister}
              className="architecture-card__btn dashboard-large-btn dashboard-large-btn--primary"
            >
              Registrarse como Organizador
            </button>
          </div>
        </div>

        {/* TARJETA 2: REGISTRO ESPECTADOR */}
        <div className="architecture-card architecture-card--viewer card-border-interactive">
          <h3 className="architecture-card__heading">Registro de Espectador</h3>

          <div className="architecture-form register-form">
            <div className="form-group">
              <label htmlFor="view-name-input">Nombre y Apellidos</label>
              <input 
                id="view-name-input"
                type="text" 
                value={viewName} 
                onChange={(e) => setViewName(e.target.value)} 
                placeholder="Tu nombre"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="view-email-input">Correo electrónico</label>
              <input 
                id="view-email-input"
                type="email" 
                value={viewEmail} 
                onChange={(e) => setViewEmail(e.target.value)} 
                placeholder="espectador@email.com"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="view-pass-input">Contraseña</label>
              <input 
                id="view-pass-input"
                type="password" 
                value={viewPassword} 
                onChange={(e) => setViewPassword(e.target.value)} 
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <button 
              type="button" 
              onClick={handleViewerRegister}
              className="architecture-card__btn dashboard-large-btn dashboard-large-btn--primary"
            >
              Registrarse como Espectador
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArchitectureSection;