import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import initialData from '../data/events.json';
import EventList from '../componentes/EventList';
import MetricCard from '../componentes/MetricCard';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [userRole, setUserRole] = useState('viewer');

  useEffect(() => {
    // Sincronizamos el rol de forma segura desde el almacenamiento local
    const currentRole = localStorage.getItem('userRole') || 'viewer';
    setUserRole(currentRole);

    const savedEvents = localStorage.getItem('codeCraftersEvents');
    let eventsList = [];

    try {
      eventsList = savedEvents ? JSON.parse(savedEvents) : initialData.events;
    } catch (error) {
      eventsList = initialData.events;
    }
    
    setEvents(eventsList);
    
    const attendeesSum = eventsList.reduce((acc, ev) => {
      return acc + Number.parseInt(ev.attendees || 0, 10);
    }, 0);
    
    setTotalAttendees(attendeesSum);
  }, []);

  const handleDeleteEvent = (id) => {
    if (userRole !== 'organizer') return;

    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));

    const newAttendeesSum = updatedEvents.reduce((acc, ev) => {
      return acc + Number.parseInt(ev.attendees || 0, 10);
    }, 0);
    setTotalAttendees(newAttendeesSum);
  };

  const isOrganizer = userRole === 'organizer';

  return (
    <div className="dashboard-container">
      
      {/* 1. SECCIÓN PRINCIPAL: Lista de eventos */}
      <main className="dashboard-main">
        <EventList events={events} onDelete={handleDeleteEvent} userRole={userRole} />
      </main>

      {/* 2. SECCIÓN INFERIOR: Métricas y botones de acción unificados */}
      <footer className="dashboard-footer-section">
        
        {/* Cuadrícula de métricas moderna con MetricCard */}
        <div className="dashboard-metrics-grid">
          <MetricCard 
            title="Eventos Totales" 
            value={events.length} 
            change="+12%" 
            isPositive={true} 
          />
          <MetricCard 
            title="Asistentes Inscritos" 
            value={totalAttendees} 
            change="0%" 
            isPositive={true} 
          />
          <MetricCard 
            title="Estado del Almacenamiento" 
            value="Sincronizado" 
            change="100%" 
            isPositive={true} 
          />
        </div>

        {/* Contenedor de botones de acción unificados */}
        <div className="dashboard-footer-actions">
          {isOrganizer && (
            <button 
              type="button"
              onClick={() => navigate('/organizer/create-event')}
              className="dashboard-large-btn dashboard-large-btn--primary"
            >
              + Crear Evento ⚙️
            </button>
          )}

          <button 
            type="button"
            onClick={() => navigate('/')}
            className="dashboard-large-btn dashboard-large-btn--secondary"
          >
            ← Volver a la Landing Page
          </button>

          <button 
            type="button"
            onClick={() => navigate('/events')}
            className="dashboard-large-btn dashboard-large-btn--secondary"
          >
            Siguiente (Explorar Eventos) →
          </button>

          <button 
            type="button" 
            onClick={() => {
              localStorage.removeItem('userRole');
              navigate('/login');
            }} 
            className="dashboard-large-btn dashboard-large-btn--danger"
          >
            Cerrar Sesión 🚪
          </button>
        </div>

      </footer>

    </div>
  );
};

export default OrganizerDashboard;