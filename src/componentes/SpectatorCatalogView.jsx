import React, { useState } from 'react';
import EventList from './EventList';
import '../styles/spectatorcatalog.scss';

export default function SpectatorCatalogView({
  events,
  cart,
  totalPrice,
  onAddToCart,
  onRemoveFromCart,
  onProceedToCheckout,
  onNavigateHome,
  onOpenSupport
}) {
  // 1. Estados locales para el buscador y los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 2. Lógica de filtrado en tiempo real sobre la prop `events`
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="spectator-page">
      <header className="spectator-header">
        <div>
          <h1 className="spectator-header__title">Catálogo de Espectáculos</h1>
          <p className="spectator-header__subtitle">
            Selecciona tus eventos favoritos y asegura tus localidades.
          </p>
        </div>
        <div className="spectator-cart-badge">
          <span>🛒 {cart.length} {cart.length === 1 ? 'evento' : 'eventos'}</span>
          <span className="spectator-cart-badge__total">{totalPrice.toFixed(2)}€</span>
        </div>
      </header>

      {/* 3. Barra de Filtros y Búsqueda añadida visualmente */}
      <div className="spectator-filters-bar" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <input 
          type="text"
          placeholder="Buscar eventos tecnológicos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
        />
        
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="all">Todas las categorías</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ai">Inteligencia Artificial</option>
        </select>
      </div>

      <div className="spectator-catalog-layout">
        <div className="spectator-events-section">
          {/* 4. Pasamos los eventos ya filtrados al EventList */}
          <EventList 
            events={filteredEvents} 
            userRole="spectator"
            onAddToCart={onAddToCart} 
          />
        </div>

        <aside className="spectator-cart-sidebar">
          <h3 className="spectator-cart-sidebar__title">Tu Carrito</h3>
          {cart.length === 0 ? (
            <p className="spectator-cart-sidebar__empty">No hay entradas seleccionadas.</p>
          ) : (
            <div className="spectator-cart-sidebar__list">
              {cart.map((item, index) => (
                <div key={index} className="spectator-cart-item">
                  <div>
                    <h4 className="spectator-cart-item__title">{item.title}</h4>
                    <span className="spectator-cart-item__price">{item.price.toFixed(2)}€</span>
                  </div>
                  <button 
                    type="button"
                    className="spectator-cart-item__remove"
                    onClick={() => onRemoveFromCart(index)}
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="spectator-cart-sidebar__summary">
            <div className="spectator-cart-sidebar__total-row">
              <span>Total a Pagar:</span>
              <span className="spectator-cart-sidebar__total-value">{totalPrice.toFixed(2)}€</span>
            </div>
            <button 
              type="button"
              className="spectator-btn spectator-btn--primary spectator-btn--full"
              disabled={cart.length === 0}
              onClick={onProceedToCheckout}
            >
              Proceder al Pago
            </button>
          </div>
        </aside>
      </div>

      <nav className="spectator-footer-nav">
        <button 
          type="button"
          className="spectator-nav-btn" 
          onClick={onNavigateHome}
        >
          🏠 Catálogo Principal
        </button>
        <button 
          type="button"
          className="spectator-nav-btn" 
          onClick={onOpenSupport}
        >
          ❓ Ayuda y Soporte
        </button>
      </nav>
    </div>
  );
}
