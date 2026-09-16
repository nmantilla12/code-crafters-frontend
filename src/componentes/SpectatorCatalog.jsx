import React, { useState } from 'react';
import SpectatorCatalogView from './SpectatorCatalogView';
import PaymentGateway from './PaymentGateway';
import TicketQR from './TicketQR';
import SupportForm from './SupportForm';
import '../styles/spectatorcatalog.scss';

export default function SpectatorCatalog({ onNavigate }) {
  const [events] = useState([
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
  ]);

  const [cart, setCart] = useState([]);
  const [step, setStep] = useState('catalog'); // 'catalog' | 'checkout' | 'success' | 'support'
  const [ticketData, setTicketData] = useState(null);

  const addToCart = (event) => setCart([...cart, event]);
  const removeFromCart = (indexToRemove) => setCart(cart.filter((_, index) => index !== indexToRemove));
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {step === 'catalog' && (
        <SpectatorCatalogView
          events={events}
          cart={cart}
          totalPrice={totalPrice}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onProceedToCheckout={() => setStep('checkout')}
          onNavigateHome={() => onNavigate && onNavigate('home')}
          onOpenSupport={() => setStep('support')}
        />
      )}

      {step === 'checkout' && (
        <PaymentGateway 
          totalPrice={totalPrice}
          cartCount={cart.length}
          onBack={() => setStep('catalog')}
          onPaymentSuccess={(paymentData) => {
            const newTicket = {
              id: 'TKT-' + Math.floor(100000 + Math.random() * 900000),
              date: new Date().toLocaleDateString(),
              items: [...cart],
              total: totalPrice,
              buyer: paymentData.cardName || 'Cliente Spectator'
            };
            setTicketData(newTicket);
            setStep('success');
          }}
        />
      )}

      {step === 'success' && ticketData && (
        <div className="spectator-fullscreen-center">
          <div className="spectator-box-card spectator-ticket-box">
            <TicketQR 
              eventTitle={ticketData.items.map(i => i.title).join(' + ')}
              eventDate={ticketData.items[0]?.date || 'Fecha por confirmar'}
              ticketId={ticketData.id}
              currentUserEmail=""
            />
            <div className="spectator-success-actions" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button 
                type="button"
                className="spectator-btn spectator-btn--secondary"
                onClick={() => { setCart([]); setStep('catalog'); }}
              >
                Finalizar / Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'support' && (
        <SupportForm onBack={() => setStep('catalog')} />
      )}
    </>
  );
}