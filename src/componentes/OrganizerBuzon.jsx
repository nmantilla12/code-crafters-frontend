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
    <>
      <style>{`
        .organizer-buzon-container {
          background-color: #0b0f19;
          color: #f8fafc;
          min-height: 100vh;
          width: 100%;
          padding: 3rem 1.5rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          font-family: inherit;
        }

        .organizer-buzon__main-content {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .organizer-buzon__header {
          text-align: center;
          border-bottom: 2px solid #1e293b;
          padding-bottom: 2rem;
          margin-bottom: 0.5rem;
        }

        .organizer-buzon__title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: #00e5ff;
          margin-bottom: 0.75rem;
        }

        .organizer-buzon__subtitle {
          font-size: 1.15rem;
          color: #94a3b8;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .organizer-buzon__content {
          width: 100%;
        }

        .organizer-buzon__empty {
          text-align: center;
          padding: 3rem;
          background: #111827;
          border: 2px solid #1e293b;
          border-radius: 16px;
          color: #94a3b8;
        }

        .organizer-buzon__list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .buzon-card {
          background: #111827;
          border: 2px solid #1e293b;
          border-radius: 16px;
          padding: 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .buzon-card:hover {
          border-color: #00e5ff;
          transform: translateY(-2px);
        }

        .buzon-card__header {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-size: 1rem;
          color: #94a3b8;
        }

        .buzon-card__author {
          font-weight: 700;
          color: #00e5ff;
          font-size: 1.1rem;
        }

        .buzon-card__message {
          font-size: 1.15rem;
          color: #f8fafc;
          line-height: 1.6;
          margin: 0;
        }

        .organizer-buzon__footer {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .organizer-buzon__btn-back {
          background: #00e5ff;
          color: #0b0f19;
          border: 2px solid #00e5ff;
          padding: 1rem 2.5rem;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1.15rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 6px 20px rgba(0, 229, 255, 0.25);
          transition: all 0.25s ease;
        }

        .organizer-buzon__btn-back:hover {
          background: transparent;
          color: #00e5ff;
          border-color: #00e5ff;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 229, 255, 0.4);
        }

        .organizer-buzon__site-footer {
          width: 100%;
          max-width: 900px;
          margin: 3rem auto 0 auto;
          border-top: 1px solid #1e293b;
          padding-top: 1.5rem;
          color: #94a3b8;
          font-size: 0.95rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .organizer-buzon-container {
            padding: 1.5rem 1rem;
          }
          .buzon-card {
            padding: 1.5rem;
          }
          .organizer-buzon__btn-back {
            width: 100%;
          }
        }
      `}</style>

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
    </>
  );
};

export default OrganizerBuzon;