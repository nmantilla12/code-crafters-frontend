import React from 'react';
import { LEGAL_LINKS } from '../data/legalLinks';

const SupportSection = () => {
  return (
    <section className="support-section">
      <div className="support-section__header">
        <h2 className="support-section__title">Soporte y Ayuda</h2>
        <p className="support-section__subtitle">
          Encuentra respuestas rápidas, consulta la documentación o ponte en contacto con nosotros.
        </p>
      </div>

      <div className="support-section__grid">
        {/* Tarjeta de Preguntas Frecuentes (FAQs) */}
        <div className="support-card">
          <div className="support-card__icon" aria-hidden="true">❓</div>
          <h3 className="support-card__title">Preguntas Frecuentes (FAQs)</h3>
          <p className="support-card__text">
            Resuelve tus dudas sobre accesos, inscripciones, cambios de sala y funcionamiento general de la plataforma.
          </p>
          <a href="#faqs" className="support-card__link">Ver preguntas frecuentes &rarr;</a>
        </div>

        {/* Tarjeta de Documentación */}
        <div className="support-card">
          <div className="support-card__icon" aria-hidden="true">📚</div>
          <h3 className="support-card__title">Documentación</h3>
          <p className="support-card__text">
            Accede a guías detalladas de uso, manuales técnicos y especificaciones de accesibilidad de la web.
          </p>
          <a href="#docs" className="support-card__link">Consultar documentación &rarr;</a>
        </div>
      </div>

      {/* Enlaces legales del footer corporativo */}
      <footer className="support-section__footer-links">
        <h4 className="support-section__footer-title">Información Legal</h4>
        <ul className="support-section__legal-list">
          {LEGAL_LINKS.map((link, index) => (
            <React.Fragment key={link.id}>
              <li>
                <a href={link.href} className="support-section__legal-link">
                  {link.label}
                </a>
              </li>
              {index < LEGAL_LINKS.length - 1 && (
                <li><span className="support-section__separator">•</span></li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </footer>
    </section>
  );
};

export default SupportSection;