// src/components/Footer.jsx
import React from 'react';
import { COMMUNITY_LINKS } from '../data/legalLinks';

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-container {
          background: linear-gradient(180deg, #0b132b 0%, #060918 100%);
          color: #ffffff;
          padding: 3.5rem 2rem 3rem 2rem;
          border-top: 1px solid rgba(56, 189, 248, 0.2);
          box-shadow: 0 -10px 25px rgba(15, 23, 42, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.75rem;
          width: 100%;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          margin-top: auto;
        }

        .footer__text {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 500;
          color: #94a3b8;
          letter-spacing: -0.01em;
        }

        .footer__links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.25rem;
          list-style: none !important;
          list-style-type: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .footer__links li {
          list-style: none !important;
          list-style-type: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .footer__link {
          color: #38bdf8;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.5rem 0.95rem;
          transition: all 0.25s ease;
          border-radius: 8px;
          background-color: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.25);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .footer__link:hover {
          color: #ffffff;
          background-color: #1e3a8a;
          border-color: #38bdf8;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
          transform: translateY(-2px);
        }

        /* Ajustes específicos para móviles */
        @media (max-width: 768px) {
          .footer-container {
            padding: 2.5rem 1.25rem;
            gap: 1.5rem;
          }

          .footer__text {
            font-size: 0.95rem;
            padding: 0 0.5rem;
            line-height: 1.5;
          }

          .footer__links {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
            width: 100%;
            max-width: 340px;
            list-style: none !important;
            list-style-type: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .footer__link {
            font-size: 0.95rem;
            padding: 0.65rem 0.5rem;
            text-align: center;
            display: block;
            width: 100%;
            box-sizing: border-box;
            background-color: #1e293b;
          }
        }
      `}</style>

      <footer className="footer-container">
        <p className="footer__text">© 2026 Code Crafters. Built for the Dev Community.</p>
        <ul className="footer__links">
          {COMMUNITY_LINKS.map((link) => (
            <li key={link.id} style={{ listStyle: 'none', listStyleType: 'none', margin: 0, padding: 0 }}>
              <a 
                href={link.href} 
                className="footer__link"
                onClick={(e) => {
                  if (link.label === 'Discord') {
                    e.preventDefault();
                    alert('Usuario de Discord: mantilla0624');
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
};

export default Footer;