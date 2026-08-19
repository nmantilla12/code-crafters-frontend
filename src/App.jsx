import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrganizerLayout from './layouts/OrganizerLayout';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Ruta principal: Muestra la Landing Page de Code Crafters 2026 */}
        <Route path="/" element={<LandingPage />} />

        {/* Rutas del Panel de Organizador bajo un layout dedicado */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          {/* Redirección por defecto al entrar en /organizer */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Vista del Panel de Control */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Vista de Creación de Eventos */}
          <Route path="create-event" element={<CreateEvent />} />
        </Route>

        {/* Ruta comodín por si escriben cualquier otra URL, redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;