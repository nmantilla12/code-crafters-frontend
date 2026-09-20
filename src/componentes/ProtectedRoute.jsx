// src/componentes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Buscamos de forma flexible en cualquiera de las claves posibles
  const rawOrganizer = localStorage.getItem('organizadorUser');
  const rawCrafters = localStorage.getItem('codeCraftersUser');
  const userRole = localStorage.getItem('userRole');

  let currentUser = null;

  try {
    if (rawOrganizer) {
      currentUser = JSON.parse(rawOrganizer);
    } else if (rawCrafters) {
      currentUser = JSON.parse(rawCrafters);
    } else if (userRole) {
      // Si solo hay rol guardado, construimos un usuario válido temporalmente
      currentUser = { role: userRole, loggedIn: true };
    }
  } catch (error) {
    currentUser = null;
  }

  console.log('🔍 ProtectedRoute - organizerUser:', rawOrganizer);
  console.log('🔍 ProtectedRoute - codeCraftersUser:', rawCrafters);
  console.log('🔍 ProtectedRoute - Usuario parseado final:', currentUser);

  // Validación robusta
  const isAuthenticated = currentUser && (currentUser.loggedIn || currentUser.role === 'organizer' || userRole === 'organizer');

  if (!isAuthenticated) {
    console.warn('⛔ Acceso denegado por ProtectedRoute. Redirigiendo a /login...');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;