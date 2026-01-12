import React from 'react';
import '../../css/saski.css'; // <--- Importamos TU CSS personalizado
import { FaTimes, FaTrash, FaCreditCard } from 'react-icons/fa';

const ErosketaSaski = ({ isOpen, onClose, items, onRemove }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.precio, 0);

  return (
    // Usamos la clase personalizada .saski-overlay en vez de estilos inline
    <div className="saski-overlay" onClick={onClose}>
      
      {/* .saski-panel es el contenedor blanco que se desliza */}
      <div className="saski-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* CABECERA PERSONALIZADA */}
        <div className="saski-header d-flex justify-content-between align-items-center">
          <h2 className="saski-title">Zure Saskia</h2>
          <button onClick={onClose} className="btn btn-link text-dark p-0">
            <FaTimes size={24} />
          </button>
        </div>

        {/* CUERPO DEL CARRITO */}
        <div className="saski-body">
          {items.length === 0 ? (
            <div className="text-center mt-5 text-muted opacity-50">
                <FaShoppingCart size={50} className="mb-3" />
                <p>Oraindik ez duzu ezer aukeratu...</p>
            </div>
          ) : (
            items.map((item, index) => (
              // Tarjeta personalizada con CSS (.saski-item)
              <div key={index} className="saski-item d-flex align-items-center gap-3">
                
                <img src={item.img} alt={item.titulo} className="saski-img" />
                
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold">{item.titulo}</h6>
                  <small className="text-muted">{item.artista}</small>
                  <div className="text-warning fw-bold mt-1">{item.precio}€</div>
                </div>

                <button 
                  className="btn-delete shadow-sm" 
                  onClick={() => onRemove(index)}
                >
                  <FaTrash size={12} />
                </button>

              </div>
            ))
          )}
        </div>

        {/* PIE DE PÁGINA (CHECKOUT) */}
        {items.length > 0 && (
          <div className="saski-footer">
            <div className="d-flex justify-content-between mb-3 align-items-end">
              <span className="text-muted small">GUZTIRA / TOTAL</span>
              <span className="fs-2 fw-bold">{total}€</span>
            </div>
            
            <button className="btn-checkout d-flex justify-content-center align-items-center gap-2">
              <FaCreditCard /> Ordaindu
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ErosketaSaski;