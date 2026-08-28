import React from 'react';
import { COMMUNITY_LINKS } from '../data/legalLinks';

const Footer = () => {
  return (
    <>
      {/* Estilos CSS inyectados para garantizar tipografía grande, contraste AAA y diseño 100% responsive */}
      <style>{`
        .footer-container {
          background-color: #0f172a;
          color: #ffffff;
          padding: 2.5rem 2rem;
          border-top: 2px solid #334155;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          margin-top: auto;
        }

        .footer__text {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #f8fafc;
          letter-spacing: -0.01em;
        }

        .footer__links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer__link {
          color: #38bdf8;
          text-decoration: underline;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          transition: color 0.2s ease, background-color 0.2s ease;
          border-radius: 4px;
        }

        .footer__link:hover {
          color: #bae6fd;
          background-color: #1e293b;
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 2rem 1rem;
            gap: 1.25rem;
          }

          .footer__text {
            font-size: 1rem;
          }

          .footer__links {
            flex-direction: column;
            gap: 1rem;
          }

          .footer__link {
            font-size: 1rem;
          }
        }
      `}</style>

      <footer className="footer-container">
        <p className="footer__text">© 2026 Code Crafters. Built for the Dev Community.</p>
        <div className="footer__links">
          {COMMUNITY_LINKS.map((link) => (
            <a 
              key={link.id} 
              href={link.href} 
              className="footer__link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
