// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import OrganizerLayout from './layouts/OrganizerLayout';
import Dashboard from './pages/Dashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import CreateEventForm from './componentes/CreateEventForm';
import ExploreEvents from './pages/ExploreEvents';
import EventDetail from './pages/EventDetail';
import SupportSection from './componentes/SupportSection';
import NotificationsCenter from './componentes/NotificationsCenter'; // Importamos tu componente limpio

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Ruta principal: Muestra la Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Rutas de Autenticación */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Vistas principales de la aplicación */}
        <Route path="/events" element={<ExploreEvents />} />
        <Route path="/event-detail" element={<EventDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
        
        {/* Ruta dedicada para probar el Centro de Notificaciones con su diseño moderno */}
        <Route path="/notifications" element={
          <div style={{ background: '#07090e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
            <NotificationsCenter />
          </div>
        } />

        {/* Ruta de Support utilizando tu componente completo */}
        <Route path="/support" element={
          <div style={{ background: '#0b1120', minHeight: '100vh' }}>
            <SupportSection />
          </div>
        } />

        {/* Ruta directa para el OrganizerDashboard por si el login la requiere */}
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />

        {/* Rutas del Panel de Organizador bajo un layout dedicado */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-event" element={<CreateEventForm />} />
          <Route path="manage-event/:id" element={<Dashboard />} />
        </Route>

        {/* Ruta comodín por si escriben cualquier otra URL, redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;