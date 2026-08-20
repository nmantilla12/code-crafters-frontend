import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventsData from '../data/events.json';

const ExploreEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todo');

  // Filtrar eventos por categoría y texto de búsqueda
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'Todo') return matchesSearch;
    return matchesSearch && event.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Separar el evento destacado (Keynote) de los estándar para lograr el diseño asimétrico de la foto
  const featuredEvent = filteredEvents.find(e => e.type === 'featured') || filteredEvents[0];
  const standardEvents = filteredEvents.filter(e => e.id !== featuredEvent?.id);

  return (
    <div className="explore-events-page" style={{ background: '#0b1120', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      
      {/* 1. Navbar Superior (idéntico a la captura) */}
      <header className="explore-events__navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button 
          type="button" 
          onClick={() => navigate('/')}
          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Code Crafters 2026
        </button>
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Descubrir</button>
          <button type="button" onClick={() => navigate('/events')} style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontWeight: 'bold', cursor: 'pointer' }}>Eventos</button>
          <button type="button" onClick={() => navigate('/organizer/dashboard')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Dashboard</button>
          <button type="button" onClick={() => navigate('/support')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Soporte</button>
        </nav>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Login</button>
          <button type="button" onClick={() => navigate('/register')} style={{ background: '#38bdf8', border: 'none', color: '#0f172a', padding: '0.4rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Registrarse</button>
        </div>
      </header>

      {/* 2. Encabezado de la Sección */}
      <div className="explore-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '0.5rem' }}>
          2. Explorar Eventos
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Descubre sesiones técnicas, talleres de arquitectura de software y paneles de IA. Filtra por stack tecnológico o nivel de experiencia.
        </p>
      </div>

      {/* 3. Barra de Búsqueda y Filtros de Categoría */}
      <div className="filter-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center', background: '#1e293b', padding: '1rem', borderRadius: '8px', border: '1px solid #334155' }}>
        <input 
          type="text" 
          placeholder="Buscar eventos, speakers o tecnologías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '0.75rem 1rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff', minWidth: '250px' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['Todo', 'Frontend', 'Backend', 'AI & ML'].map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: selectedCategory === category ? '#38bdf8' : '#0f172a',
                color: selectedCategory === category ? '#0f172a' : '#94a3b8',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Grilla Asimétrica Estilo Captura */}
      <div className="events-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Tarjeta Principal Destacada (Keynote) - Ocupa ancho completo si es necesario */}
        {featuredEvent && (
          <div className="featured-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridColumn: '1 / -1' }}>
            <div>
              {featuredEvent.status === 'EN VIVO' && (
                <span style={{ background: '#ef4444', color: '#fff', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px' }}>
                  EN VIVO
                </span>
              )}
              <h2 style={{ fontSize: '1.5rem', marginTop: '1rem', marginBottom: '0.5rem', color: '#fff' }}>{featuredEvent.title}</h2>
              <p style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '1rem' }}>{featuredEvent.date} | {featuredEvent.location || 'Main Stage'}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{featuredEvent.description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ background: '#0f172a', color: '#94a3b8', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid #334155' }}>Arquitectura</span>
                <span style={{ background: '#0f172a', color: '#94a3b8', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid #334155' }}>Web</span>
              </div>
              <button 
                type="button" 
                style={{ background: '#22d3ee', color: '#0f172a', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Entrar ↗
              </button>
            </div>
          </div>
        )}

        {/* Tarjetas Secundarias */}
        {standardEvents.map(event => (
          <div key={event.id} className="event-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#34d399', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '500' }}>{event.date}</p>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: '#fff' }}>{event.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{event.description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: '#0f172a', color: '#94a3b8', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid #334155' }}>
                {event.category}
              </span>
              <button 
                type="button" 
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
                title="Guardar evento"
              >
                🔖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Footer (idéntico a la captura) */}
      <footer style={{ marginTop: '4rem', color: '#64748b', fontSize: '0.85rem', borderTop: '1px solid #1e293b', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p>© 2026 Code Crafters. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Privacidad</span>
          <span style={{ cursor: 'pointer' }}>Términos</span>
          <span style={{ cursor: 'pointer' }}>Contacto</span>
          <span style={{ cursor: 'pointer' }}>FAQ</span>
        </div>
      </footer>
    </div>
  );
};

export default ExploreEvents;