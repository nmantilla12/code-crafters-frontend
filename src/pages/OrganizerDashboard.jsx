import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import initialData from '../data/events.json';
import EventList from '../componentes/EventList';
import MetricCard from '../componentes/MetricCard';

const OrganizerDashboard = () => {
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
      
      {/* CONTENEDOR ESPECÍFICO PARA LAS MÉTRICAS */}
      <div className="dashboard-metrics-wrapper">
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

    </div>
  );
};

export default OrganizerDashboard;