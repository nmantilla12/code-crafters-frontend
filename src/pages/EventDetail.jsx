import React, { useState } from 'react';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';

const EventDetail = () => {
  // Estado para el formulario de inscripción
  const [ticketType, setTicketType] = useState('Pase General - €299');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !acceptTerms) {
      alert('Por favor, completa todos los campos y acepta los términos.');
      return;
    }
    console.log('Inscripción registrada:', { ticketType, fullName, email });
    setIsRegistered(true);
  };

  return (
    <div className="event-detail-page" style={{ background: '#0b1120', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      
      {/* 1. Navbar Reutilizable */}
      <Navbar />

      {/* 2. Contenido Principal en Grid */}
      <div className="event-detail__container" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem', alignItems: 'start', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Columna Izquierda: Información del Evento, Agenda y Ponentes */}
        <div>
          {/* Cabecera del Evento */}
          <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #334155', borderRadius: '12px', padding: '2.5rem', marginBottom: '3rem' }}>
            <span style={{ background: '#334155', color: '#38bdf8', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
              Conferencia Técnica
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem', lineHeight: '1.2' }}>
              Arquitectura y Flujo de Sistemas
            </h1>
            <div style={{ display: 'flex', gap: '1.5rem', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span>📅 15-16 Octubre, 2026</span>
              <span>📍 Tech Hub, Madrid</span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6' }}>
              Únete a nosotros para una exploración profunda de los flujos de usuarios, arquitectura de sistemas y diseño de interfaces avanzadas. Analizaremos casos de estudio reales, incluyendo la optimización del panel de control para organizadores y la implementación de dashboards de alto rendimiento.
            </p>
          </div>

          {/* Agenda Técnica */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>
              Agenda Técnica
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              {/* Día 1 */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 'bold' }}>Día 1: Fundamentos</h3>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Oct 15</span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold' }}>09:00</span>
                  <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600', marginTop: '0.2rem' }}>Análisis del 'Inicio'</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Desglosando el primer punto de contacto.</p>
                </div>
                <div>
                  <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold' }}>11:30</span>
                  <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600', marginTop: '0.2rem' }}>Arquitectura de Dashboards</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Patrones de diseño para visualización de datos masivos.</p>
                </div>
              </div>

              {/* Día 2 */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 'bold' }}>Día 2: Avanzado</h3>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Oct 16</span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold' }}>10:00</span>
                  <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600', marginTop: '0.2rem' }}>Integración del Panel de Control</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Conectando el dashboard con herramientas administrativas.</p>
                </div>
                <div>
                  <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold' }}>14:00</span>
                  <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600', marginTop: '0.2rem' }}>Soporte y Resiliencia</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Flujos de contacto y manejo de errores a escala.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Ponentes Destacados */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>
              Ponentes Destacados
            </h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#1e293b', padding: '1rem', borderRadius: '8px', border: '1px solid #334155', minWidth: '220px' }}>
                <div style={{ width: '50px', height: '50px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#38bdf8' }}>
                  ER
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold' }}>Elena R.</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Lead Architect</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#1e293b', padding: '1rem', borderRadius: '8px', border: '1px solid #334155', minWidth: '220px' }}>
                <div style={{ width: '50px', height: '50px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#38bdf8' }}>
                  CM
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold' }}>Carlos M.</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>UX/UI Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Inscripción */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem', position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
            Asegura tu plaza
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Completa tus datos para registrarte en Code Crafters 2026.
          </p>

          {isRegistered ? (
            <div style={{ background: '#065f46', color: '#ecfdf5', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>¡Inscripción Exitosa! 🎉</h3>
              <p style={{ fontSize: '0.85rem' }}>Te hemos enviado tu entrada y código QR al correo electrónico.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="ticketTypeSelect" style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Tipo de Entrada
                </label>
                <select 
                  id="ticketTypeSelect"
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                >
                  <option value="Pase General - €299">Pase General - €299</option>
                  <option value="Pase VIP / All Access - €499">Pase VIP / All Access - €499</option>
                  <option value="Pase Estudiante - €99">Pase Estudiante - €99</option>
                </select>
              </div>

              <div>
                <label htmlFor="fullNameInput" style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Nombre Completo
                </label>
                <input 
                  id="fullNameInput"
                  type="text" 
                  placeholder="Ej. Ana García"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label htmlFor="emailInput" style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Correo Electrónico
                </label>
                <input 
                  id="emailInput"
                  type="email" 
                  placeholder="ana@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="termsCheckbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  style={{ marginTop: '0.2rem', cursor: 'pointer' }}
                />
                <label htmlFor="termsCheckbox" style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: '1.4', cursor: 'pointer' }}>
                  Acepto los <span style={{ color: '#38bdf8' }}>términos y condiciones</span> y la política de privacidad.
                </label>
              </div>

              <button 
                type="submit"
                style={{ width: '100%', background: '#06b6d4', color: '#0f172a', border: 'none', padding: '0.75rem', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.5rem' }}
              >
                Inscribirse ahora
              </button>
            </form>
          )}

          <p style={{ color: '#64748b', fontSize: '0.75rem', textAlign: 'center', marginTop: '1.5rem' }}>
            Plazas limitadas. Reserva hoy.
          </p>
        </div>

      </div>

      {/* 3. Footer Reutilizable */}
      <Footer />
    </div>
  );
};

export default EventDetail;