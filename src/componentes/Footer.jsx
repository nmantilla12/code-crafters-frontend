// src/components/Footer.jsx
import React from 'react';
import { COMMUNITY_LINKS } from '../data/legalLinks';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer__text">© 2026 Code Crafters. Built for the Dev Community.</p>
      <ul className="footer__links">
        {COMMUNITY_LINKS.map((link) => (
          <li key={link.id}>
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
  );
};

export default Footer;