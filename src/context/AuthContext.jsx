// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos y exportamos el Proveedor
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('attendee'); // 'attendee' u 'organizer'

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Exportamos explícitamente el hook personalizado useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};