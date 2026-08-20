import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrganizerLayout from './layouts/OrganizerLayout';
import Dashboard from './pages/Dashboard';
import CreateEventForm from './componentes/CreateEventForm';
import ExploreEvents from './pages/ExploreEvents';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Ruta principal: Muestra la Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Nuevas vistas principales de la aplicación */}
        <Route path="/events" element={<ExploreEvents />} />
        <Route path="/event-detail" element={<EventDetail />} />
        {/* Opcional: Ruta dinámica para eventos específicos por ID */}
        <Route path="/event/:id" element={<EventDetail />} />

        {/* Rutas del Panel de Organizador bajo un layout dedicado */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          {/* Redirección por defecto al entrar en /organizer */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Vista del Panel de Control */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Vista de Creación de Eventos */}
          <Route path="create-event" element={<CreateEventForm />} />
        </Route>

        {/* Ruta comodín por si escriben cualquier otra URL, redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;