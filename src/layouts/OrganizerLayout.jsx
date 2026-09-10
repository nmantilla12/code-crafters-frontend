// src/layouts/OrganizerLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const OrganizerLayout = () => {
  return (
    <div className="organizer-layout">
      <main className="organizer-layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizerLayout;