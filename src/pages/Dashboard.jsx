import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import initialData from '../data/events.json';
import EventList from '../componentes/EventList';
import MetricCard from '../componentes/MetricCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState('viewer');

  useEffect(() => {
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
  }, []);

  const totalAttendees = events.reduce((acc, ev) => {
    return acc + Number.parseInt(ev.attendees || 0, 10);
  }, 0);

  const handleDeleteEvent = (id) => {
    if (userRole !== 'organizer') return;

    const updatedEvents = events.filter((event) => (event.id || event._id) !== id);
    setEvents(updatedEvents);
    localStorage.setItem('codeCraftersEvents', JSON.stringify(updatedEvents));
  };

  const handleManageEvent = (id) => {
    navigate(`/organizer/edit-event/${id}`);
  };

  return (
    <div className="dashboard-container">
      
      {/* SECCIÓN DE MÉTRICAS */}
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

      {/* SECCIÓN PRINCIPAL */}
      <main className="dashboard-main">
        <EventList 
          events={events} 
          onManage={handleManageEvent} 
          onDelete={handleDeleteEvent} 
          userRole={userRole} 
        />
      </main>

      {/* BARRA INFERIOR DE NAVEGACIÓN */}
      <div className="dashboard-footer-navigation">
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          className="dashboard-footer-btn"
        >
          ← Volver al inicio
        </button>

        <button 
          type="button" 
          onClick={() => navigate('/organizer/create-event')} 
          className="dashboard-footer-btn dashboard-footer-btn--primary"
        >
          + Crear Evento ⚙
        </button>

        <button 
          type="button" 
          onClick={() => navigate('/organizer/buzon-quejas')} 
          className="dashboard-footer-btn"
        >
          Buzón de Quejas →
        </button>
      </div>

    </div>
  );
};

export default Dashboard;