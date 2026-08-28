// src/pages/EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import initialData from '../data/events.json';

const EventDetail = () => {
  const { id } = useParams();
  
  const [event, setEvent] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const savedEvents = localStorage.getItem('codeCraftersEvents');
    const eventsList = savedEvents ? JSON.parse(savedEvents) : initialData.events;
    const foundEvent = eventsList.find((e) => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (!event) {
    return (
      <div className="event-detail-page" style={{ background: '#0b1120', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
        <Navbar />
        <div style={{ color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>Evento no encontrado.</div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !acceptTerms) {
      alert('Por favor, completa todos los campos y acepta los términos.');
      return;
    }

    const savedEvents = JSON.parse(localStorage.getItem('codeCraftersEvents')) || initialData.events;
    
    const updatedEvents = savedEvents.map((ev) => {
      if (ev.id === id) {
        const currentRegistered = ev.registeredUsers || [];
        const newAttendee = { fullName, email, date: new Date().toISOString() };
        
        return {
          ...ev,
          // Aplicada la buena práctica usando Number.parseInt en lugar del global parseInt
          attendees: (Number.parseInt(ev.attendees || 0, 10) + 1).toString(),
          registeredUsers: [...currentRegistered, newAttendee]
        };
      }
      return ev;
    });

    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));
    setIsRegistered(true);
  };

  return (
    <div className="event-detail-page" style={{ background: '#0b1120', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <Navbar />
      
      <div className="event-detail__container" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem', alignItems: 'start', maxWidth: '1200px', margin: '2rem auto' }}>
        
        {/* Columna Izquierda: Datos dinámicos del evento */}
        <div>
          <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #334155', borderRadius: '12px', padding: '2.5rem', marginBottom: '3rem' }}>
            <span style={{ background: '#334155', color: '#38bdf8', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
              {event.category}
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>
              {event.title}
            </h1>
            <div style={{ display: 'flex', gap: '1.5rem', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
              <span>👥 Asistentes: {event.attendees || 0}</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{event.description}</p>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem', position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
            Asegura tu plaza
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Completa tus datos para registrarte en el evento.
          </p>

          {isRegistered ? (
            <div style={{ background: '#065f46', color: '#ecfdf5', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>¡Inscripción Exitosa! 🎉</h3>
              <p style={{ fontSize: '0.85rem' }}>Te hemos enviado tu entrada y código QR al correo electrónico.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;