import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../componentes/BottomNav';

const OrganizerLayout = () => {
  return (
    <div className="organizer-layout">
      <main className="organizer-layout__main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default OrganizerLayout;