import React from 'react';
import EventItem from './EventItem';

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
              event={event}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default EventList;