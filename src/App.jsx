import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrganizerLayout from './layouts/OrganizerLayout/OrganizerLayout';
import Dashboard from './pages/Dashboard'; // O la ruta exacta donde tengas tu Dashboard

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
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;