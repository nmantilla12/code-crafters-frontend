// src/pages/EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import TicketQR from '../componentes/TicketQR';
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
      <div className="event-detail-page">
        <Navbar />
        <div className="event-detail-page__not-found">Evento no encontrado.</div>
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
    <div className="event-detail-page">
      <Navbar />
      
      <div className="event-detail__container">
        
        {/* Columna Izquierda: Datos dinámicos del evento */}
        <div>
          <div className="event-detail__card">
            <span className="event-detail__category">
              {event.category}
            </span>
            <h1 className="event-detail__title">
              {event.title}
            </h1>
            <div className="event-detail__meta">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
              <span>👥 Asistentes: {event.attendees || 0}</span>
            </div>
            <p className="event-detail__description">{event.description}</p>
          </div>
        </div>

        {/* Columna Derecha: Formulario o Ticket QR generado */}
        <div className="event-detail__sidebar">
          
          {isRegistered ? (
            <div>
              <div className="event-detail__success-banner">
                <h3 className="event-detail__success-title">¡Inscripción Exitosa! 🎉</h3>
                <p className="event-detail__success-text">Tu entrada oficial está lista.</p>
              </div>
              
              <TicketQR 
                eventTitle={event.title}
                eventDate={event.date}
                ticketId={`TICKET-${event.id}-${email.toUpperCase()}`}
                eventId={event.id}
                currentUserEmail={email}
              />
            </div>
          ) : (
            <>
              <h2 className="event-detail__form-title">
                Asegura tu plaza
              </h2>
              <p className="event-detail__form-subtitle">
                Completa tus datos para registrarte en el evento.
              </p>

              <form onSubmit={handleSubmit} className="event-detail__form">
                <div className="form-group">
                  <label htmlFor="fullNameInput" className="form-group__label">
                    Nombre Completo
                  </label>
                  <input 
                    id="fullNameInput"
                    type="text" 
                    placeholder="Ej. Ana García"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-group__input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emailInput" className="form-group__label">
                    Correo Electrónico
                  </label>
                  <input 
                    id="emailInput"
                    type="email" 
                    placeholder="ana@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-group__input"
                    required
                  />
                </div>

                <div className="form-group form-group--checkbox">
                  <input 
                    type="checkbox" 
                    id="termsCheckbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="termsCheckbox" className="form-group__checkbox-label">
                    Acepto los <span>términos y condiciones</span> y la política de privacidad.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="event-detail__btn-submit"
                >
                  Inscribirse ahora
                </button>
              </form>
            </>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;