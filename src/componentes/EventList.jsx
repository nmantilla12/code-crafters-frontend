import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events = [], onDelete }) => {
  return (
    <>
      {/* Estilos CSS inyectados para garantizar diseño responsive de cuadrícula, contraste AAA y accesibilidad superior */}
      <style>{`
        .event-list-section {
          background-color: #0f172a;
          color: #ffffff;
          padding: 2.5rem 2rem;
          border-radius: 12px;
          border: 2px solid #334155;
          max-width: 1200px;
          width: 100%;
          margin: 2rem auto;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .event-list__title {
          margin: 0 0 1.75rem 0;
          font-size: 1.8rem;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.025em;
          border-bottom: 2px solid #334155;
          padding-bottom: 1rem;
        }

        .event-list__empty {
          text-align: center;
          color: #cbd5e1;
          font-size: 1.15rem;
          font-weight: 600;
          padding: 3.5rem 1rem;
          background: #1e293b;
          border-radius: 8px;
          border: 2px dashed #475569;
          margin: 0;
        }

        .event-list__container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.75rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .event-list-section {
            padding: 1.5rem 1rem;
            margin: 1rem;
            width: calc(100% - 2rem);
          }

          .event-list__title {
            font-size: 1.5rem;
          }

          .event-list__container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="event-list-section">
        <h3 className="event-list__title">Eventos Disponibles y Gestión</h3>
        
        {events.length === 0 ? (
          <p className="event-list__empty">
            No hay eventos creados todavía. Explora el catálogo o crea un nuevo evento para comenzar.
          </p>
        ) : (
          <div className="event-list__container">
            {events.map((event) => (
              <EventItem 
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                attendees={event.attendees}
                status={event.status}
                icon={event.icon}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default EventList;