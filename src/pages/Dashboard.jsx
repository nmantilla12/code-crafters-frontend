import React from 'react';
import MetricCard from '../componentes/MetricCard';
import EventList from '../componentes/EventList';

const Dashboard = () => {
  return (
    <main className="dashboard-page">
      <h1 className="dashboard-page__title">Panel de Control</h1>
      
      {/* Sección de tarjetas de métricas */}
      <section className="dashboard-page__metrics">
        <MetricCard />
      </section>

      {/* Sección de listado de eventos */}
      <section className="dashboard-page__events">
        <EventList />
      </section>
    </main>
  );
};

export default Dashboard;