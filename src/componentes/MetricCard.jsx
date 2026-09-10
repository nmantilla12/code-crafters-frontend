import React from 'react';
import MetricCard from './MetricCard';

const OrganizerDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Cuadrícula de Métricas */}
      <div className="dashboard-metrics-grid">
        <MetricCard 
          title="Eventos Totales" 
          value="2" 
          change="+12%" 
          isPositive={true} 
        />
        <MetricCard 
          title="Asistentes Inscritos" 
          value="0" 
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

      {/* Panel de Acciones e Infraestructura */}
      <div className="dashboard-panel">
        <p className="dashboard-panel__description">
          Control total sobre la infraestructura del evento y telemetría en tiempo real.
        </p>
        
        <div className="dashboard-panel__actions">
          <button type="button" className="dashboard-btn dashboard-btn--primary">
            + Crear Evento ⚙️
          </button>
          
          <button type="button" className="dashboard-btn dashboard-btn--secondary">
            ← Volver a la Landing Page
          </button>
          
          <button type="button" className="dashboard-btn dashboard-btn--secondary">
            Siguiente (Explorar Eventos) →
          </button>
          
          <button type="button" className="dashboard-btn dashboard-btn--danger">
            Cerrar Sesión 🚪
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;