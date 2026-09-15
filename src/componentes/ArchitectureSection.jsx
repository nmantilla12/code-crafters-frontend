import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArchitectureSection = () => {
  const navigate = useNavigate();

  const [specName, setSpecName] = useState('');
  const [specEmail, setSpecEmail] = useState('');
  const [specPassword, setSpecPassword] = useState('');

  const [orgForm, setOrgForm] = useState({ name: '', email: '', password: '' });

  const handleOrgChange = (e) => {
    setOrgForm({ ...orgForm, [e.target.name]: e.target.value });
  };

  const handleOrganizerRegister = (e) => {
    e.preventDefault();
    if (!orgForm.name.trim() || !orgForm.email.trim() || !orgForm.password.trim()) {
      alert('Por favor, completa todos los campos del organizador.');
      return;
    }
    localStorage.setItem('organizerUser', JSON.stringify({ ...orgForm, role: 'organizer' }));
    navigate('/organizer/dashboard');
  };

  const handleSpectatorSubmit = (e) => {
    e.preventDefault();
    if (!specName.trim() || !specEmail.trim() || !specPassword.trim()) {
      alert('Por favor, completa todos los campos del espectador.');
      return;
    }

    const spectatorData = {
      name: specName,
      email: specEmail,
      password: specPassword,
      role: 'spectator'
    };

    localStorage.setItem('spectatorUser', JSON.stringify(spectatorData));
    navigate('/spectator/catalog');
  };

  return (
    <section className="architecture-section">
      <div className="architecture-section__header">
        <h2 className="architecture-section__title">Elige tu Rol en Code Crafters</h2>
        <p className="architecture-section__subtitle">
          Regístrate como organizador o como espectador para acceder al soporte y catálogo.
        </p>
      </div>

      <div className="architecture-section__grid">
        {/* TARJETA 1: ORGANIZADOR */}
        <div className="architecture-card">
          <h3 className="architecture-card__heading">Registro de Organizador</h3>
          <p className="architecture-section__subtitle">
            Crea tu cuenta para gestionar y administrar tus talleres y eventos.
          </p>

          <form onSubmit={handleOrganizerRegister} className="architecture-form">
            <div className="form-group">
              <label htmlFor="org-name">Nombre</label>
              <input
                id="org-name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={orgForm.name}
                onChange={handleOrgChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="org-email">Correo Electrónico</label>
              <input
                id="org-email"
                name="email"
                type="email"
                placeholder="organizador@codecrafters.com"
                value={orgForm.email}
                onChange={handleOrgChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="org-password">Contraseña</label>
              <input
                id="org-password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={orgForm.password}
                onChange={handleOrgChange}
              />
            </div>
            <button type="submit" className="architecture-card__btn">
              Registrarse como Organizador
            </button>
          </form>
        </div>

        {/* TARJETA 2: ESPECTADOR */}
        <div className="architecture-card">
          <h3 className="architecture-card__heading">Registro de Espectador</h3>
          <p className="architecture-section__subtitle">
            Regístrate para explorar el catálogo oficial y comprar tus entradas.
          </p>

          <form onSubmit={handleSpectatorSubmit} className="architecture-form">
            <div className="form-group">
              <label htmlFor="spec-name">Nombre</label>
              <input
                id="spec-name"
                type="text"
                placeholder="Tu nombre"
                value={specName}
                onChange={(e) => setSpecName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="spec-email">Correo Electrónico</label>
              <input
                id="spec-email"
                type="email"
                placeholder="espectador@codecrafters.com"
                value={specEmail}
                onChange={(e) => setSpecEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="spec-password">Contraseña</label>
              <input
                id="spec-password"
                type="password"
                placeholder="••••••••"
                value={specPassword}
                onChange={(e) => setSpecPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="architecture-card__btn">
              Registrarse como Espectador
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;