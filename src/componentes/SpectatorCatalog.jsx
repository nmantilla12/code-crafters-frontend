import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/spectatorcatalog.scss';

export default function SpectatorCatalog({ onNavigate }) {
  const events = [
    {
      id: 1,
      tag: 'Deportes',
      title: 'Gran Final de eSports 2026',
      date: '15 Octubre, 2026',
      location: 'Arena Central, Madrid',
      description: 'Disfruta en directo de los mejores equipos del mundo midiéndose por el título global.',
      price: 45.00
    },
    {
      id: 2,
      tag: 'Música',
      title: 'Festival Neón Sound',
      date: '28 Noviembre, 2026',
      location: 'Auditorio OpenAir',
      description: 'Una noche inmersiva con música electrónica, visuales láser y artistas internacionales.',
      price: 60.00
    },
    {
      id: 3,
      tag: 'Tecnología',
      title: 'Conferencia Future Tech',
      date: '10 Diciembre, 2026',
      location: 'Palacio de Congresos',
      description: 'Charlas magistrales sobre inteligencia artificial, robótica y desarrollo web avanzado.',
      price: 30.00
    }
  ];

  const [cart, setCart] = useState([]);
  const [step, setStep] = useState('catalog'); // 'catalog' | 'checkout' | 'success' | 'support'
  
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [ticketData, setTicketData] = useState(null);
  
  // Estado para el formulario de soporte profesional
  const [supportForm, setSupportForm] = useState({ name: '', email: '', message: '' });
  const [supportSent, setSupportSent] = useState(false);

  const addToCart = (event) => {
    setCart([...cart, event]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    const newTicket = {
      id: 'TKT-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: totalPrice,
      buyer: paymentData.cardName || 'Cliente Spectator'
    };
    setTicketData(newTicket);
    setStep('success');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!ticketData) return;
    
    // Texto plano limpio y formateado profesionalmente para WhatsApp
    const itemsText = ticketData.items
      .map(i => `- ${i.title} (${i.date}): ${i.price.toFixed(2)} EUR`)
      .join('\n');

    const message = `COMPROBANTE DE ENTRADAS - CODECRAFTERS\n\n` +
      `Localidad: ${ticketData.id}\n` +
      `Titular: ${ticketData.buyer}\n` +
      `Fecha de emision: ${ticketData.date}\n\n` +
      `Eventos Adquiridos:\n${itemsText}\n\n` +
      `Total Pagado: ${ticketData.total.toFixed(2)} EUR\n\n` +
      `¡Nos vemos en el evento!`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    
    const destinatario = "nnnnmantilla@gmail.com";
    const asunto = encodeURIComponent(`Nueva consulta de soporte de: ${supportForm.name}`);
    const cuerpo = encodeURIComponent(
      `Hola Nira,\n\nHas recibido un nuevo mensaje desde el Centro de Ayuda y Soporte:\n\n` +
      `Nombre: ${supportForm.name}\n` +
      `Correo del remitente: ${supportForm.email}\n\n` +
      `Mensaje:\n${supportForm.message}\n\n` +
      `---\nEnviado desde la plataforma CodeCrafters / Spectator`
    );

    window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
    setSupportSent(true);
  };

  return (
    <div className="spectator-page">
      {/* =========================================================
          VISTA 1: CATÁLOGO DE EVENTOS Y CARRITO
         ========================================================= */}
      {step === 'catalog' && (
        <>
          <header className="spectator-header">
            <div>
              <h1 className="spectator-header__title">Catálogo de Espectáculos</h1>
              <p className="spectator-header__subtitle">
                Selecciona tus eventos favoritos y asegura tus localidades con pago instantáneo.
              </p>
            </div>
            <div className="spectator-cart-badge">
              <span>🛒 {cart.length} {cart.length === 1 ? 'evento' : 'eventos'}</span>
              <span className="spectator-cart-badge__total">{totalPrice.toFixed(2)}€</span>
            </div>
          </header>

          <div className="spectator-catalog-layout">
            <div className="spectator-events-grid">
              {events.map((event) => (
                <div key={event.id} className="spectator-card">
                  <div>
                    <span className="spectator-card__header-tag">{event.tag}</span>
                    <h3 className="spectator-card__title">{event.title}</h3>
                    <div className="spectator-card__info">
                      <span>📅 {event.date}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <p className="spectator-card__desc">{event.description}</p>
                  </div>
                  <div className="spectator-card__footer">
                    <span className="spectator-card__price">{event.price.toFixed(2)}€</span>
                    <button 
                      className="spectator-btn spectator-btn--primary"
                      onClick={() => addToCart(event)}
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
                        className="spectator-cart-item__remove"
                        onClick={() => removeFromCart(index)}
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
                  className="spectator-btn spectator-btn--primary spectator-btn--full"
                  disabled={cart.length === 0}
                  onClick={() => setStep('checkout')}
                >
                  Proceder al Pago
                </button>
              </div>
            </aside>
          </div>

          <nav className="spectator-footer-nav">
            <button className="spectator-nav-btn" onClick={() => onNavigate && onNavigate('home')}>
              🏠 Catálogo Principal
            </button>
            <button className="spectator-nav-btn" onClick={() => setStep('support')}>
              ❓ Ayuda y Soporte
            </button>
          </nav>
        </>
      )}

      {/* =========================================================
          VISTA 2: PASARELA DE PAGO (GRANDE Y CENTRADA)
         ========================================================= */}
      {step === 'checkout' && (
        <div className="spectator-fullscreen-center">
          <div className="spectator-box-card">
            <h2 className="spectator-box-card__title">💳 Pasarela de Pago Segura</h2>
            <p className="spectator-box-card__desc">
              Importe total a abonar: <strong className="spectator-highlight">{totalPrice.toFixed(2)}€</strong> por {cart.length} entrada(s).
            </p>
            
            <form onSubmit={handleProcessPayment} className="spectator-form">
              <div className="spectator-form__group">
                <label className="spectator-form__label">Nombre en la Tarjeta</label>
                <input 
                  type="text" 
                  name="cardName" 
                  required 
                  placeholder="Ej. Nira Mantilla" 
                  value={paymentData.cardName}
                  onChange={handleInputChange}
                  className="spectator-form__input"
                />
              </div>

              <div className="spectator-form__group">
                <label className="spectator-form__label">Número de Tarjeta</label>
                <input 
                  type="text" 
                  name="cardNumber" 
                  required 
                  maxLength="19" 
                  placeholder="4000 1234 5678 9010" 
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  className="spectator-form__input"
                />
              </div>

              <div className="spectator-form__row">
                <div className="spectator-form__group">
                  <label className="spectator-form__label">Fecha Caducidad</label>
                  <input 
                    type="text" 
                    name="expiryDate" 
                    required 
                    placeholder="MM/AA" 
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    className="spectator-form__input"
                  />
                </div>
                <div className="spectator-form__group">
                  <label className="spectator-form__label">CVV</label>
                  <input 
                    type="password" 
                    name="cvv" 
                    required 
                    maxLength="4" 
                    placeholder="123" 
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    className="spectator-form__input"
                  />
                </div>
              </div>

              <div className="spectator-form__actions">
                <button 
                  type="button" 
                  className="spectator-btn spectator-btn--secondary"
                  onClick={() => setStep('catalog')}
                >
                  ← Volver al Catálogo
                </button>
                <button 
                  type="submit" 
                  className="spectator-btn spectator-btn--primary"
                >
                  Confirmar y Pagar {totalPrice.toFixed(2)}€
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          VISTA 3: COMPROBANTE DE ÉXITO CON QR Y BOTONES PROFESIONALES
         ========================================================= */}
      {step === 'success' && ticketData && (
        <div className="spectator-fullscreen-center">
          <div className="spectator-box-card spectator-ticket-box">
            <div className="spectator-success-header">
              <span className="spectator-success-icon">🎉</span>
              <h2>¡Pago Realizado con Éxito!</h2>
              <p>Tu entrada digital ha sido generada correctamente con su código QR de acceso.</p>
            </div>

            <div id="printable-ticket" className="spectator-ticket-receipt">
              <div className="spectator-ticket-top">
                <div>
                  <span className="spectator-ticket-label">Localidad ID</span>
                  <h3>{ticketData.id}</h3>
                </div>
                <div className="spectator-ticket-holder">
                  <span>Titular: <strong>{ticketData.buyer}</strong></span>
                </div>
              </div>

              <div className="spectator-ticket-content">
                <div className="spectator-ticket-details">
                  <h4>Eventos Adquiridos:</h4>
                  <ul>
                    {ticketData.items.map((it, idx) => (
                      <li key={idx}><strong>{it.title}</strong> — {it.price.toFixed(2)}€ ({it.date})</li>
                    ))}
                  </ul>
                  <div className="spectator-ticket-total">
                    Total Pagado: <span>{ticketData.total.toFixed(2)}€</span>
                  </div>
                </div>
                <div className="spectator-ticket-qr">
                  <QRCodeSVG value={`Ticket: ${ticketData.id} - Titular: ${ticketData.buyer} - Total: ${ticketData.total}EUR`} size={130} />
                </div>
              </div>
            </div>

            <div className="spectator-success-actions">
              <button 
                className="spectator-btn spectator-btn--primary"
                onClick={handleDownloadPDF}
              >
                📥 Descargar PDF / Imprimir
              </button>
              <button 
                className="spectator-btn spectator-btn--whatsapp"
                onClick={handleShareWhatsApp}
              >
                💬 Compartir en WhatsApp
              </button>
              <button 
                className="spectator-btn spectator-btn--secondary"
                onClick={() => { setCart([]); setStep('catalog'); }}
              >
                Finalizar / Inicio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          VISTA 4: CENTRO DE SOPORTE Y AYUDA (2 COLUMNAS PROFESIONALES)
         ========================================================= */}
      {step === 'support' && (
        <div className="spectator-fullscreen-center">
          <div className="spectator-support-container">
            <div className="spectator-support-header">
              <h2>❓ Centro de Ayuda y Soporte</h2>
              <p>Encuentra respuestas rápidas en nuestras FAQ o envíanos tu consulta directamente.</p>
            </div>

            <div className="spectator-support-grid">
              {/* Columna 1: Preguntas Frecuentes */}
              <div className="spectator-support-card">
                <h3>📚 Preguntas Frecuentes (FAQ)</h3>
                
                <div className="spectator-faq-box">
                  <h4>¿Cómo descargo mis entradas en PDF?</h4>
                  <p>Una vez completado el pago con éxito, haz clic en el botón "Descargar PDF / Imprimir" en la pantalla de recibo.</p>
                </div>

                <div className="spectator-faq-box">
                  <h4>¿Puedo compartir mi entrada por WhatsApp?</h4>
                  <p>Sí, pulsa el botón verde de WhatsApp en tu comprobante digital para enviar los detalles de forma inmediata.</p>
                </div>

                <div className="spectator-faq-box">
                  <h4>¿Qué hago si tengo problemas con el pago?</h4>
                  <p>Verifica que los datos de tu tarjeta sean correctos o usa el formulario de la derecha para contactar con nuestro equipo técnico.</p>
                </div>
              </div>

              {/* Columna 2: Formulario de Contacto Profesional */}
              <div className="spectator-support-card">
                <h3>✉️ Envíanos un Mensaje</h3>
                {supportSent ? (
                  <div className="spectator-success-msg">
                    ✅ ¡Mensaje preparado con éxito!<br />
                    <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Se ha abierto tu correo para enviar el mensaje a nnnnmantilla@gmail.com</span>
                  </div>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="spectator-form-pro">
                    <div className="spectator-form-group">
                      <label>Tu Nombre Completo</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Ej. Nira Mantilla"
                        value={supportForm.name}
                        onChange={(e) => setSupportForm({...supportForm, name: e.target.value})}
                      />
                    </div>
                    <div className="spectator-form-group">
                      <label>Correo Electrónico</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="tucorreo@ejemplo.com"
                        value={supportForm.email}
                        onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                      />
                    </div>
                    <div className="spectator-form-group">
                      <label>Mensaje o Problema</label>
                      <textarea 
                        required 
                        rows="4"
                        placeholder="Cuéntanos detalladamente en qué podemos ayudarte..."
                        value={supportForm.message}
                        onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button type="submit" className="spectator-btn spectator-btn--primary">
                      🚀 Enviar Consulta
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="spectator-support-footer-action">
              <button 
                className="spectator-btn spectator-btn--secondary"
                onClick={() => { setSupportSent(false); setStep('catalog'); }}
              >
                ← Volver al Catálogo Principal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}