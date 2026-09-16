import React from 'react';
import { COMMUNITY_LINKS } from '../data/legalLinks';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer__content">
        <p className="footer__text">© 2026 Code Crafters. Built for the Dev Community.</p>
        <p className="footer__text">
          Soporte Técnico Oficial:{' '}
          <a href="mailto:nnnmantillam@gmail.com" className="footer__support-link">
            nnnmantillam@gmail.com
          </a>
        </p>
      </div>
      <ul className="footer__links">
        {COMMUNITY_LINKS.map((link) => {
          const isGitHub = link.label.toLowerCase() === 'github';
          const isDiscord = link.label.toLowerCase() === 'discord';
          
          let href = link.href;
          if (isGitHub) href = 'https://github.com/nmantilla12';
          if (isDiscord) href = 'https://discord.com'; // O cambia esto por el link de invitación de tu servidor

          return (
            <li key={link.id}>
              <a 
                href={href} 
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;