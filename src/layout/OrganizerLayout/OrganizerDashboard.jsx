import React from 'react';
import EventForm from './EventForm'; // Importa tu formulario recién creado
import eventsData from '../../data/events.json'; // Importa tu JSON de eventos

const OrganizerDashboard = () => {
  return (
    <div className="organizer-dashboard" style={{ padding: '20px' }}>
      <h2>Panel de Control del Organizador</h2>
      
      {/* Sección del Formulario */}
      <section style={{ marginBottom: '40px' }}>
        <EventForm />
      </section>

      {/* Sección para listar los eventos de tu JSON */}
      <section>
        <h3>Eventos Actuales (desde events.json)</h3>
        <ul>
          {eventsData.map((event) => (
            <li key={event.id} style={{ marginBottom: '10px' }}>
              <strong>{event.title}</strong> - {event.date} ({event.location})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OrganizerDashboard;