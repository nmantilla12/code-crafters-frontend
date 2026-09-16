// src/components/OrganizerBuzon.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerBuzon = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const savedComplaints = localStorage.getItem('codeCraftersComplaints');
    if (savedComplaints) {
      try {
        setComplaints(JSON.parse(savedComplaints));
      } catch (e) {
        setComplaints([]);
      }
    } else {
      setComplaints([
        { id: 1, user: 'Espectador Anónimo', message: 'Me gustaría que hubiera más talleres prácticos de Backend y microservicios.', date: '2026-09-10' },
        { id: 2, user: 'Laura Gómez', message: 'El proceso de inscripción fue muy rápido y claro. ¡Felicitaciones al equipo!', date: '2026-09-11' }
      ]);
    }
  }, []);

  return (
    <div className="organizer-buzon-container">
      <main className="organizer-buzon__main-content">
        
        <header className="organizer-buzon__header">
          <h1 className="organizer-buzon__title">
            Buzón de Quejas o Sugerencias
          </h1>
          <p className="organizer-buzon__subtitle">
            Revisa los comentarios, opiniones y sugerencias enviados por los asistentes para mejorar las próximas ediciones.
          </p>
        </header>

        <div className="organizer-buzon__content">
          {complaints.length === 0 ? (
            <div className="organizer-buzon__empty">
              <p>No hay quejas o sugerencias registradas por el momento.</p>
            </div>
          ) : (
            <div className="organizer-buzon__list">
              {complaints.map((item) => (
                <article key={item.id} className="buzon-card">
                  <div className="buzon-card__header">
                    <span className="buzon-card__author">👤 {item.user}</span>
                    <span className="buzon-card__date">📅 {item.date}</span>
                  </div>
                  <p className="buzon-card__message">"{item.message}"</p>
                </article>
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
            ← Volver al Panel Organizador
          </button>
        </div>

      </main>

      <footer className="organizer-buzon__site-footer">
        <p>© 2026 CodeCrafters Events. Todos los derechos reservados. — Panel de Gestión de Organizadores</p>
      </footer>
    </div>
  );
};

export default OrganizerBuzon;