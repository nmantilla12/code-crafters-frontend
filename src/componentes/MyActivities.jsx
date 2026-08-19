import React, { useState, useEffect } from 'react';
import TicketQR from './TicketQR';

const MyActivities = () => {
  const [tickets, setTickets] = useState([]);

  // Función para cargar los tickets desde localStorage
  const loadTickets = () => {
    const savedTickets = JSON.parse(localStorage.getItem('myTickets')) || [];
    setTickets(savedTickets);
  };

  useEffect(() => {
    // 1. Cargar tickets al montar el componente
    loadTickets();

    // 2. Escuchar cambios en localStorage (por si se inscriben desde otra pestaña o componente)
    const handleStorageChange = () => {
      loadTickets();
    };

    // Evento nativo para cambios de almacenamiento
    window.addEventListener('storage', handleStorageChange);

    // Evento personalizado por si la inscripción ocurre en la misma pestaña
    window.addEventListener('ticketRegistered', loadTickets);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ticketRegistered', loadTickets);
    };
  }, []);

  return (
    <section className="my-activities">
      <h3 className="my-activities__title">Mis Actividades</h3>
      
      {tickets.length === 0 ? (
        <p className="my-activities__empty">Aún no te has inscrito a ningún evento.</p>
      ) : (
        <div className="my-activities__grid">
          {tickets.map((ticket) => (
            <TicketQR 
              key={ticket.id}
              eventTitle={ticket.eventTitle}
              eventDate={ticket.eventDate}
              ticketId={ticket.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyActivities;