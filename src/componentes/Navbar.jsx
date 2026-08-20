// src/componentes/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
      <button 
        type="button" 
        onClick={() => navigate('/')}
        style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Code Crafters 2026
      </button>
      <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Discovery</button>
        <button type="button" onClick={() => navigate('/events')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>My Tickets</button>
        <button type="button" onClick={() => navigate('/support')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Support</button>
      </nav>
      <div>
        <button type="button" onClick={() => navigate('/register')} style={{ background: '#06b6d4', border: 'none', color: '#0f172a', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Register</button>
      </div>
    </header>
  );
};

export default Navbar;