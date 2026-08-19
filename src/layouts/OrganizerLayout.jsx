import React from 'react';
import { Outlet } from 'react-router-dom';
// Importamos la barra de navegación que acabamos de crear
import BottomNav from '../../componentes/common/BottomNav/BottomNav';

const OrganizerLayout = () => {
  return (
    <div className="organizer-layout">
      {/* Cabecera superior (puedes descomentar esto cuando crees el componente Header) */}
      {/* <Header /> */}

      {/* Contenedor principal donde se carga el Dashboard */}
      <main className="organizer-layout__main">
        <Outlet />
      </main>

      {/* Barra de navegación inferior activada */}
      <BottomNav />
    </div>
  );
};

export default OrganizerLayout;