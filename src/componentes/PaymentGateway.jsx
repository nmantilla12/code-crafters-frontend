// src/components/PaymentGateway.jsx
import React, { useState } from 'react';
import Footer from './Footer'; // 1. Importa tu componente Footer

export default function PaymentGateway({ totalPrice, cartCount, onBack, onPaymentSuccess }) {
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSuccess(paymentData);
  };

  return (
    <div className="payment-page-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Contenedor central de la pasarela de pago */}
      <div className="spectator-fullscreen-center" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="spectator-box-card">
          <h2 className="spectator-box-card__title">💳 Pasarela de Pago Segura</h2>
          <p className="spectator-box-card__desc">
            Importe total a abonar: <strong className="spectator-highlight">{totalPrice.toFixed(2)}€</strong> por {cartCount} entrada(s).
          </p>
          
          <form onSubmit={handleSubmit} className="spectator-form">
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
                onClick={onBack}
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

      {/* 2. El Footer oficial cerrando la pasarela de pago por abajo */}
      <Footer />
    </div>
  );
}