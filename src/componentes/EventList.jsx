// src/componentes/EventList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventItem from './EventItem';

const EventList = ({ events = [], onDelete }) => {
  const navigate = useNavigate();

  // Función auxiliar para asegurar una capitalización limpia y profesional en los títulos de los eventos
  const formatTitle = (title) => {
    if (!title) return '';
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const handleCreateRedirect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/organizer/create-event');
  };

  return (
    <>
      <style>{`
        .event-list-section {
          background-color: #0b0f19;
          color: #ffffff;
          padding: 3rem 2rem 6rem 2rem;
          width: 100%;
          min-height: 100vh;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          position: relative;
        }

        .event-list__wrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .event-list__header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* --- TÍTULO CON DEGRADADO AZUL TECNOLÓGICO --- */
        .event-list__title {
          margin: 0;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          background: linear-gradient(135deg, #38bdf8 0%, #00f0ff 50%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.25));
        }

        .event-list__btn-create {
          background: #00f0ff;
          color: #0b0f19;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }

        .event-list__btn-create:hover {
          background: #00adb5;
          transform: translateY(-1px);
        }

        .event-list__empty {
          text-align: center;
          color: #94a3b8;
          font-size: 1.15rem;
          font-weight: 500;
          padding: 4rem 1rem;
          background: #111827;
          border-radius: 12px;
          border: 1px solid #1f2937;
          margin: 0 0 2rem 0;
        }

        .event-list__container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 3rem;
        }

        /* Barra de navegación inferior para evitar bloqueos */
        .event-list__nav-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 4rem;
          padding-top: 1.5rem;
          border-top: 1px solid #1e293b;
          box-sizing: border-box;
        }

        .event-list__nav-btn-back {
          background-color: #1e293b;
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }

        .event-list__nav-btn-back:hover {
          background-color: #334155;
        }

        .event-list__nav-btn-next {
          background-color: #0284c7;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          transition: background-color 0.2s;
        }

        .event-list__nav-btn-next:hover {
          background-color: #0369a1;
        }

        /* Botón flotante del signo más (+) con máxima prioridad de capa */
        .event-list__fab {
          position: fixed !important;
          bottom: 2rem !important;
          right: 2rem !important;
          width: 60px !important;
          height: 60px !important;
          background-color: #00f0ff !important;
          color: #0b0f19 !important;
          border: 2px solid #ffffff !important;
          border-radius: 50% !important;
          font-size: 2.25rem !important;
          font-weight: 900 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          box-shadow: 0 6px 20px rgba(0, 240, 255, 0.6) !important;
          transition: transform 0.2s ease, background-color 0.2s ease !important;
          z-index: 99999 !important;
          pointer-events: auto !important;
        }

        .event-list__fab:hover {
          background-color: #00adb5 !important;
          transform: scale(1.1) !important;
        }

        /* Ajustes específicos para dispositivos móviles */
        @media (max-width: 768px) {
          .event-list-section {
            padding: 1.5rem 1rem;
          }

          .event-list__header-row {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            gap: 1.25rem;
          }

          .event-list__btn-create {
            width: 100%;
            text-align: center;
          }

          .event-list__container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .event-list__nav-footer {
            flex-direction: column;
            gap: 1rem;
          }

          .event-list__nav-btn-back,
          .event-list__nav-btn-next {
            width: 100%;
            justify-content: center;
          }

          .event-list__fab {
            bottom: 1.5rem !important;
            right: 1.5rem !important;
            width: 52px !important;
            height: 52px !important;
            font-size: 1.85rem !important;
          }
        }
      `}</style>

      <section className="event-list-section">
        <div className="event-list__wrapper">
          <div className="event-list__header-row">
            <h3 className="event-list__title">Eventos Disponibles y Gestión</h3>
            
            <button 
              type="button"
              className="event-list__btn-create"
              onClick={handleCreateRedirect}
            >
              + Crear Evento de Presentación
            </button>
          </div>
          
          {events.length === 0 ? (
            <p className="event-list__empty">
              No hay eventos creados todavía. Explora el catálogo o crea un nuevo evento para comenzar.
            </p>
          ) : (
            <div className="event-list__container">
              {events.map((event) => {
                const eventId = event.id || event._id;

                return (
                  <EventItem 
                    key={eventId}
                    id={eventId}
                    title={formatTitle(event.title)}
                    description={event.description}
                    date={event.date}
                    attendees={event.attendees}
                    status={event.status}
                    icon={event.icon}
                    onDelete={onDelete}
                  />
                );
              })}
            </div>
          )}

          {/* Barra de Navegación Inferior */}
          <div className="event-list__nav-footer">
            <button
              type="button"
              className="event-list__nav-btn-back"
              onClick={() => navigate(-1)}
            >
              ← Volver
            </button>

            <button
              type="button"
              className="event-list__nav-btn-next"
              onClick={handleCreateRedirect}
            >
              Siguiente (Crear Evento) →
            </button>
          </div>
        </div>

        {/* Botón flotante (+) con manejador dedicado y z-index forzado */}
        <button
          type="button"
          className="event-list__fab"
          onClick={handleCreateRedirect}
          title="Crear nuevo evento"
        >
          +
        </button>
      </section>
    </>
  );
};

export default EventList;
