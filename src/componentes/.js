// src/componentes/OrganizerBuzon.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerBuzon = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Cargamos las quejas o sugerencias enviadas por los espectadores desde el almacenamiento local
    const savedComplaints = localStorage.getItem('spectatorComplaints');
    if (savedComplaints) {
      try {
        setComplaints(JSON.parse(savedComplaints));
      } catch (e) {
        setComplaints([]);
      }
    } else {
      // Datos de ejemplo simulados para que el organizador vea las quejas de los espectadores
      setComplaints([
        {
          id: 1,
          spectatorName: 'Ana Gómez',
          email: 'ana.gomez@example.com',
          subject: 'Problema con la entrada al taller',
          message: 'No me llegó el código QR de acceso para el taller de backend.',
          date: '2026-06-10'
        },
        {
          id: 2,
          spectatorName: 'Carlos Ruiz',
          email: 'carlos.ruiz@example.com',
          subject: 'Sugerencia de horario',
          message: '¿Sería posible realizar los talleres un poco más tarde por la tarde?',
          date: '2026-06-11'
        }
      ]);
    }
  }, []);

  const handleReplyEmail = (email, subject) => {
    // Abre el cliente de correo del organizador para responder directamente al espectador
    const mailtoLink = `mailto:${email}?subject=Respuesta a: ${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="organizer-buzon-container">
      <div className="organizer-buzon__header">
        <h2 className="organizer-buzon__title">Buzón de Quejas y Sugerencias de Espectadores</h2>
        <p className="organizer-buzon__subtitle">
          Revisa las opiniones y reclamaciones enviadas por los espectadores y respóndeles directamente por correo electrónico.
        </p>
      </div>

      <div className="organizer-buzon__content">
        {complaints.length === 0 ? (
          <p className="organizer-buzon__empty">No hay quejas o sugerencias registradas por los espectadores.</p>
        ) : (
          <div className="organizer-buzon__list">
            {complaints.map((item) => (
              <div key={item.id} className="buzon-card">
                <div className="buzon-card__header">
                  <span className="buzon-card__author">{item.spectatorName} ({item.email})</span>
                  <span className="buzon-card__date">{item.date}</span>
                </div>
                <h4 className="buzon-card__subject">{item.subject}</h4>
                <p className="buzon-card__message">{item.message}</p>
                <div className="buzon-card__actions">
                  <button 
                    type="button"
                    onClick={() => handleReplyEmail(item.email, item.subject)}
                    className="buzon-card__btn-reply"
                  >
                    Responder por Correo Electrónico ✉️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="organizer-buzon__footer">
        <button 
          type="button" 
          onClick={() => navigate('/organizer/dashboard')} 
          className="organizer-buzon__btn-back"
        >
          ← Volver al Panel de Organizador
        </button>
      </div>
    </div>
  );
};

export default OrganizerBuzon;