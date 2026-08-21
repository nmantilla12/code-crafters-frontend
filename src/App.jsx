// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrganizerLayout from './layouts/OrganizerLayout';
import Dashboard from './pages/Dashboard';
import CreateEventForm from './componentes/CreateEventForm';
import ExploreEvents from './pages/ExploreEvents';
import EventDetail from './pages/EventDetail';
import SupportSection from './componentes/SupportSection'; // <-- Importamos tu componente real

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Ruta principal: Muestra la Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Vistas principales de la aplicación */}
        <Route path="/events" element={<ExploreEvents />} />
        <Route path="/event-detail" element={<EventDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
        
        {/* Ruta de Support utilizando tu componente completo */}
        <Route path="/support" element={
          <div style={{ background: '#0b1120', minHeight: '100vh' }}>
            <SupportSection />
          </div>
        } />

        {/* Rutas del Panel de Organizador bajo un layout dedicado */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-event" element={<CreateEventForm />} />
        </Route>

        {/* Ruta comodín por si escriben cualquier otra URL, redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;