import React from 'react';
import { COMMUNITY_LINKS } from '../data/legalLinks';

const Footer = () => {
  return (
    <footer className="footer">
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
  );
};

export default Footer;