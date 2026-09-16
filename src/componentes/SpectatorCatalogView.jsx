import React from 'react';
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

      <div className="spectator-catalog-layout">
        <div className="spectator-events-section">
          <EventList 
            events={events} 
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