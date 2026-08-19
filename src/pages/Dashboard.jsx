import React from 'react';
// Importamos la MetricCard y el EventList desde sus respectivas carpetas
import MetricCard from '../componentes/common/MetricCard/MetricCard';
import EventList from '../componentes/common/EventList/EventList';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Panel de Control</h1>
        <p className="dashboard__subtitle">Resumen general de tu actividad y métricas</p>
      </header>
      
      {/* Sección de tarjetas de métricas */}
      <section className="dashboard__metrics-grid">
        <MetricCard 
          title="Vistas de Página" 
          value="24.5k" 
          change="+12%" 
          isPositive={true} 
        />
        <MetricCard 
          title="Inscripciones" 
          value="1,482" 
          change="+5.4%" 
          isPositive={true} 
        />
        <MetricCard 
          title="Ingresos Netos" 
          value="12,450 €" 
          change="-2.1%" 
          isPositive={false} 
        />
      </section>

      {/* Sección del listado de eventos recientes (Ticket CODE-7) */}
      <section className="dashboard__content-section">
        <EventList />
      </section>
    </div>
  );
};
 
export default Dashboard;