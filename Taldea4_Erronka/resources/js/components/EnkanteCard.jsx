import React, { useState } from 'react';
import { FaClock, FaGavel, FaHistory } from 'react-icons/fa';

const EnkanteCard = ({ obra }) => {
  // Estado para el precio actual (simulación)
  const [precioActual, setPrecioActual] = useState(obra.precioSalida);
  // Estado para el input del usuario
  const [miPuja, setMiPuja] = useState('');
  // Estado para feedback visual (si ha pujado bien)
  const [mensaje, setMensaje] = useState('');

  const handlePujar = (e) => {
    e.preventDefault();
    const valorPuja = parseFloat(miPuja);

    if (!valorPuja || valorPuja <= precioActual) {
      setMensaje('Zure pujak uneko prezioa gainditu behar du.');
      return;
    }

    // Simular éxito
    setPrecioActual(valorPuja);
    setMensaje(`Zorionak! Zure puja (${valorPuja}€) onartu da.`);
    setMiPuja(''); // Limpiar input
    
    // Borrar mensaje a los 3 segundos
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-lg border-0 h-100 rounded-4 overflow-hidden">
        
        {/* Imagen con etiqueta de tiempo */}
        <div className="position-relative" style={{ height: '250px' }}>
          <img 
            src={obra.img} 
            className="w-100 h-100 object-fit-cover" 
            alt={obra.izenburua} 
          />
          <div className="position-absolute top-0 end-0 m-3 badge bg-danger fs-6 shadow">
            <FaClock className="me-1" /> {obra.tiempoRestante}
          </div>
        </div>

        <div className="card-body">
          <h5 className="fw-bold mb-1">{obra.izenburua}</h5>
          <p className="text-muted small mb-3">@{obra.artista}</p>

          {/* Información de la puja */}
          <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-3 border">
            <div>
              <span className="d-block text-secondary small fw-bold">UNEKO PREZIOA</span>
              <span className="fs-4 fw-bold text-dark">{precioActual} €</span>
            </div>
            <div className="text-end">
              <span className="d-block text-secondary small fw-bold">PUJAK</span>
              <span className="badge bg-secondary rounded-pill">
                <FaHistory className="me-1"/> {obra.pujasTotal}
              </span>
            </div>
          </div>

          {/* Feedback mensaje */}
          {mensaje && (
            <div className={`alert py-1 px-2 small mb-2 ${mensaje.includes('Zorionak') ? 'alert-success' : 'alert-danger'}`}>
              {mensaje}
            </div>
          )}

          {/* Formulario de puja */}
          <form onSubmit={handlePujar} className="d-flex gap-2">
            <input 
              type="number" 
              className="form-control fw-bold" 
              placeholder={`Min: ${precioActual + 1} €`}
              value={miPuja}
              onChange={(e) => setMiPuja(e.target.value)}
              min={precioActual + 1}
            />
            <button type="submit" className="btn btn-warning fw-bold text-dark d-flex align-items-center">
              <FaGavel className="me-2" /> Pujar
            </button>
          </form>
        </div>
        
        <div className="card-footer bg-white border-top-0 pb-3 text-center">
          <small className="text-muted fst-italic">
            *Irabazlea 24 ordu barru erabakiko da.
          </small>
        </div>

      </div>
    </div>
  );
};

export default EnkanteCard;