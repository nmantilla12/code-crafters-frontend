import React from 'react';
import '../styles/hero.scss';

const Hero = () => {
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

      </div>
    </section>
  );
};

export default Hero;