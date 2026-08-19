import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrganizerLayout from './layouts/OrganizerLayout';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que carga el esqueleto OrganizerLayout */}
        <Route path="/" element={<OrganizerLayout />}>
          
          {/* Redirección automática para que el Dashboard sea la vista por defecto al entrar */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Vista del Panel de Control */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Vista de Creación de Eventos */}
          <Route path="create-event" element={<CreateEvent />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;