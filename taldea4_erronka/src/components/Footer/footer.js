import React from 'react';
import "../Footer/footer.css";

// Importaciones necesarias para los iconos de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        {/* Contenido original del footer */}
        <p className="mb-0">&copy; 2025 Artetxea. Eskubide guztiak erreserbatuta.</p>
        <small>Iker Sánchez - Iñigo Marticorena - Imanol Artetxe</small>

        {/* Sección de Iconos de Redes Sociales */}
        <div className="social-icons mb-3">
          {/* Reemplaza "URL_DE_TU_..." con las URLs reales de tus perfiles */}
          
          <a href="URL_DE_TU_FACEBOOK" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          
          <a href="URL_DE_TU_TWITTER" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          
          <a href="URL_DE_TU_INSTAGRAM" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          
          <a href="URL_DE_TU_LINKEDIN" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;