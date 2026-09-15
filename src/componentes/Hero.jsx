import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hero.scss';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero" id="discovery">
      <div className="hero__content">
        
        {/* Insignia / Badge */}
        <span className="hero__badge">
          Sistema Operativo para Eventos Tech
        </span>
        
        {/* Título Principal */}
        <h1 className="hero__title">
          El Doble Ecosistema para la Excelencia en Eventos.
        </h1>
        
        {/* Subtítulo */}
        <p className="hero__subtitle">
          Una plataforma unificada. Dos experiencias de alto rendimiento. Para organizadores que exigen control absoluto y espectadores que buscan descubrimiento sin fricción.
        </p>

        {/* Botones de Acción */}
        <div className="hero__buttons">
          <button 
            type="button" 
            className="hero__btn hero__btn--primary"
            onClick={() => navigate('/events')}
          >
            Explorando Plataforma ↗
          </button>
          
          <button 
            type="button" 
            className="hero__btn hero__btn--secondary" 
            onClick={() => navigate('/support')}
          >
            Ver Documentación &lt;&gt;
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;