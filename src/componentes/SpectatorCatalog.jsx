// src/componentes/SpectatorCatalog.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SupportForm from './SupportForm';
import '../styles/spectatorcatalog.scss';

export default function SpectatorCatalog() {
  const location = useLocation();
  const [currentView, setCurrentView] = useState('catalog'); 
  const [cart, setCart] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [error, setError] = useState('');
  const [confirmedTickets, setConfirmedTickets] = useState([]);
  const [ticketNumber, setTicketNumber] = useState('');

  useEffect(() => {
    if (location.pathname.includes('support')) {
      setCurrentView('support');
    }
  }, [location.pathname]);

  const events = [
    {
      id: 1,
      tag: 'Deportes',
      title: 'Gran Final de eSports 2026',
      date: '15 Octubre, 2026',
      location: 'Arena Central, Madrid',
      desc: 'Disfruta en directo de los mejores equipos del mundo midiéndose por el título global.',
      price: 45.00
    },
    {
      id: 2,
      tag: 'Música',
      title: 'Festival Neón Sound',
      date: '28 Noviembre, 2026',
      location: 'Auditorio OpenAir',
      desc: 'Una noche inmersiva con música electrónica, visuales láser y artistas internacionales.',
      price: 60.00
    },
    {
      id: 3,
      tag: 'Tecnología',
      title: 'Conferencia Future Tech',
      date: '10 Diciembre, 2026',
      location: 'Palacio de Congresos',
      desc: 'Charlas magistrales sobre inteligencia artificial, robótica y desarrollo web avanzado.',
      price: 30.00
    }
  ];

  const addToCart = (eventItem) => {
    if (!cart.some(item => item.id === eventItem.id)) {
      setCart([...cart, eventItem]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      setError('Por favor, completa todos los campos de pago y datos personales para emitir tus entradas.');
      return;
    }
    setError('');
    const generatedCode = 'SP-' + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(generatedCode);
    setConfirmedTickets([...cart]);
    setCart([]);
    setCurrentView('success');
  };

  const renderQRCodeSVG = (size = 90) => `
    <svg width="${size}" height="${size}" viewBox="0 0 33 33" style="background: #ffffff; padding: 4px; border-radius: 6px;">
      <path fill="#0f172a" d="M0 0h13v13H0zM4 4h5v5H4zM19 0h14v14H19zM23 4h6v6H23zM0 19h13v13H0zM4 23h5v5H4z"/>
      <path fill="#ffffff" d="M2 2h9v9H2zM21 2h10v10H21zM2 21h9v9H2z"/>
      <path fill="#0f172a" d="M5 5h3v3H5zM24 5h4v4h-4zM5 24h3v3H5zM14 0h3v5h-3zM14 8h3v5h-3zM0 14h5v3H0zM8 14h5v3H8zM19 19h4v4h-4zM26 19h7v4h-7zM19 26h4v7h-4zM27 26h6v4H6zM14 14h5v5h-5zM14 22h3v4h-3zM22 14h4v3h-4z"/>
    </svg>
  `;

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const eventNames = confirmedTickets.map(t => t.title).join(', ');
    const message = `¡Hola! Ya tengo mis entradas oficiales para ${eventNames} en Spectator 2026. Referencia: ${ticketNumber}. Titular: ${formData.name}. ¡Nos vemos allí!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="spectator-page">
      {currentView === 'catalog' && (
        <>
          <header className="spectator-header">
            <div>
              <h1 className="spectator-header__title">Catálogo de Espectáculos</h1>
              <p className="spectator-header__subtitle">
                Selecciona tus eventos favoritos y asegura tus localidades con pago instantáneo.
              </p>
            </div>
            <div className="spectator-cart-badge">
              <span>🛒</span>
              <span>{cart.length} {cart.length === 1 ? 'evento' : 'eventos'}</span>
              <span className="spectator-cart-badge__total">{totalPrice.toFixed(2)}€</span>
            </div>
          </header>

          <div className="spectator-catalog-layout">
            <div className="spectator-events-grid">
              {events.map((ev) => (
                <div className="spectator-card" key={ev.id}>
                  <div>
                    <span className="spectator-card__header-tag">{ev.tag}</span>
                    <h3 className="spectator-card__title">{ev.title}</h3>
                    <div className="spectator-card__info">
                      <span>📅 {ev.date}</span>
                      <span>📍 {ev.location}</span>
                    </div>
                    <p className="spectator-card__desc">{ev.desc}</p>
                  </div>
                  <div className="spectator-card__footer">
                    <span className="spectator-card__price">{ev.price.toFixed(2)}€</span>
                    <button 
                      className="spectator-btn spectator-btn--primary"
                      onClick={() => addToCart(ev)}
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="spectator-cart-sidebar">
              <h3 className="spectator-cart-sidebar__title">Tu Carrito</h3>
              {cart.length === 0 ? (
                <p className="spectator-cart-sidebar__empty">No hay eventos seleccionados</p>
              ) : (
                <div>
                  <div className="spectator-cart-sidebar__list">
                    {cart.map((item) => (
                      <div className="spectator-cart-item" key={item.id}>
                        <div>
                          <h4 className="spectator-cart-item__title">{item.title}</h4>
                          <span className="spectator-cart-item__price">{item.price.toFixed(2)}€</span>
                        </div>
                        <button 
                          className="spectator-cart-item__remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="spectator-cart-sidebar__summary">
                    <div className="spectator-cart-sidebar__total-row">
                      <span>Total a Pagar:</span>
                      <span>{totalPrice.toFixed(2)}€</span>
                    </div>
                    <button 
                      className="spectator-btn spectator-btn--primary"
                      style={{ width: '100%' }}
                      onClick={() => setCurrentView('checkout')}
                    >
                      Proceder al Pago
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </>
      )}

      {currentView === 'checkout' && (
        <div className="spectator-checkout-wrapper">
          <div className="spectator-checkout-card">
            <div className="spectator-checkout-card__header">
              <h2 className="spectator-checkout-card__title">Pasarela de Pago Segura</h2>
              <p className="spectator-checkout-card__subtitle">
                Introduce los datos de tu tarjeta y facturación para completar la emisión de tus entradas.
              </p>
            </div>

            {error && <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: '600' }}>{error}</div>}

            <form className="spectator-extended-form" onSubmit={handleCheckoutSubmit}>
              <div className="spectator-extended-form__group">
                <label className="spectator-extended-form__label">Nombre Completo del Titular</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Ej. Nira Mantilla" 
                  className="spectator-extended-form__control"
                />
              </div>

              <div className="spectator-extended-form__row">
                <div className="spectator-extended-form__group">
                  <label className="spectator-extended-form__label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="nira@correo.com" 
                    className="spectator-extended-form__control"
                  />
                </div>
                <div className="spectator-extended-form__group" style={{ gridColumn: 'span 2' }}>
                  <label className="spectator-extended-form__label">Teléfono Móvil</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="+34 600 123 456" 
                    className="spectator-extended-form__control"
                  />
                </div>
              </div>

              <div className="spectator-extended-form__group">
                <label className="spectator-extended-form__label">Número de Tarjeta</label>
                <input 
                  type="text" 
                  name="cardNumber" 
                  value={formData.cardNumber} 
                  onChange={handleInputChange} 
                  placeholder="4532 •••• •••• 8920" 
                  maxLength="19"
                  className="spectator-extended-form__control"
                />
              </div>

              <div className="spectator-extended-form__row">
                <div className="spectator-extended-form__group">
                  <label className="spectator-extended-form__label">Caducidad (MM/AA)</label>
                  <input 
                    type="text" 
                    name="expiryDate" 
                    value={formData.expiryDate} 
                    onChange={handleInputChange} 
                    placeholder="12/28" 
                    maxLength="5"
                    className="spectator-extended-form__control"
                  />
                </div>
                <div className="spectator-extended-form__group" style={{ gridColumn: 'span 2' }}>
                  <label className="spectator-extended-form__label">CVV / C. Seguridad</label>
                  <input 
                    type="password" 
                    name="cvv" 
                    value={formData.cvv} 
                    onChange={handleInputChange} 
                    placeholder="123" 
                    maxLength="4"
                    className="spectator-extended-form__control"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
                <button 
                  type="button" 
                  className="spectator-btn spectator-btn--secondary"
                  onClick={() => setCurrentView('catalog')}
                >
                  ← Volver al Catálogo
                </button>
                <button 
                  type="submit" 
                  className="spectator-btn spectator-btn--primary"
                >
                  Pagar {totalPrice.toFixed(2)}€ Ahora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {currentView === 'success' && (
        <div className="spectator-success-container">
          <div className="spectator-success-box">
            <div className="spectator-success__icon">🎉</div>
            <h2 className="spectator-success__title">¡Pago Exitoso! Entradas Emitidas</h2>
            <p className="spectator-success__desc">
              Tus entradas oficiales están listas. Descarga tu archivo PDF con código QR integrado o compártelas por WhatsApp.
            </p>

            <div className="spectator-tickets-preview">
              {confirmedTickets.map((ticket) => (
                <div className="spectator-ticket-card" key={ticket.id}>
                  <div className="ticket-info">
                    <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px' }}>
                      PASE VIP OFICIAL • REF: {ticketNumber}
                    </span>
                    <h4 style={{ margin: '0.4rem 0', fontSize: '1.5rem', color: '#ffffff' }}>{ticket.title}</h4>
                    <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>📅 {ticket.date}</p>
                    <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>📍 {ticket.location}</p>
                    <p style={{ marginTop: '0.6rem', color: '#34d399', fontWeight: 'bold', fontSize: '0.95rem' }}>
                      👤 Titular: {formData.name}
                    </p>
                  </div>
                  <div className="spectator-qr-box" style={{ background: '#ffffff', padding: '10px', borderRadius: '10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div dangerouslySetInnerHTML={{ __html: renderQRCodeSVG(80) }} />
                    <span style={{ fontSize: '10px', color: '#0f172a', fontWeight: 'bold', marginTop: '4px' }}>ESCANEAR QR</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="spectator-actions-grid no-print">
              <button 
                className="spectator-btn spectator-btn--primary"
                onClick={handleDownloadPDF}
              >
                📥 Descargar / Imprimir Entrada (.PDF)
              </button>
              <button 
                className="spectator-btn spectator-btn--whatsapp"
                onClick={handleWhatsAppShare}
              >
                💬 Compartir Ticket por WhatsApp
              </button>
              <button 
                className="spectator-btn spectator-btn--secondary"
                onClick={() => setCurrentView('catalog')}
              >
                🏠 Comprar más entradas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISTA DE SOPORTE: RENDERIZA LAS DOS TARJETAS GRANDES INDEPENDIENTES */}
      {currentView === 'support' && (
        <SupportForm onBack={() => setCurrentView('catalog')} />
      )}

      <footer className="spectator-footer-nav no-print">
        <button className="spectator-nav-btn" onClick={() => setCurrentView('catalog')}>
          🏠 Catálogo Principal
        </button>
        <button className="spectator-nav-btn" onClick={() => setCurrentView('support')}>
          ❓ Ayuda y Soporte
        </button>
      </footer>
    </div>
  );
}