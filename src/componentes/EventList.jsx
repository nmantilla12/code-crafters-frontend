// src/componentes/EventList.jsx
import React from 'react';
import EventItem from './EventItem';

// Ya NO importa eventsData. Recibe 'events' y 'onDelete' desde el padre.
const EventList = ({ events = [], onDelete }) => {
  return (
    <section className="event-list">
      <h3 className="event-list__title">Eventos Recientes</h3>
      
      {events.length === 0 ? (
        <p className="event-list__empty">No hay eventos creados todavía.</p>
      ) : (
        <div className="event-list__container">
          {events.map((event) => (
            <EventItem 
              key={event.id}
              id={event.id}
              title={event.title}
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
  );
};

export default EventList;