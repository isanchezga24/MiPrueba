import React, { useState } from 'react';
import { FaEllipsisV, FaHeart, FaRegHeart, FaShareAlt, FaMapMarkerAlt, FaGlobe, FaInfoCircle } from 'react-icons/fa';

const ObraCard = ({ obra }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm border-0 h-100 rounded-4">
        
        {/* --- HEADER: Avatar, Título y Menú --- */}
        <div className="card-header d-flex align-items-center bg-white border-bottom-0 pt-3 px-3 rounded-top-4">
          
          {/* Avatar con la inicial */}
          <span className={`d-flex justify-content-center align-items-center rounded-circle text-white fw-bold ${obra.color}`} 
                style={{width: '45px', height: '45px', fontSize: '1.2rem'}}>
            {obra.avatar}
          </span>
          
          <div className="ms-3">
            <h6 className="mb-0 fw-bold text-dark">{obra.izenburua}</h6>
            <span className="text-muted small">@{obra.artista} • {obra.data}</span>
          </div>
          
          {/* Menú de 3 puntos (Opciones extra) */}
          <div className="dropdown ms-auto">
            <button className="btn btn-link text-muted p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FaEllipsisV />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
              <li><a className="dropdown-item" href="#">Salatu (Denunciar)</a></li>
              <li><a className="dropdown-item" href="#">Gorde (Guardar)</a></li>
              <li><a className="dropdown-item" href="#">Profila ikusi</a></li>
            </ul>
          </div>
        </div>

        {/* --- IMAGEN DE LA OBRA --- */}
        <div style={{ height: '350px', overflow: 'hidden', cursor: 'pointer' }}> 
            <img 
              src={obra.img} 
              className="card-img-top w-100 h-100 object-fit-cover" 
              alt={obra.izenburua} 
            />
        </div>

        {/* --- BODY: Descripción y Localización --- */}
        <div className="card-body">
          
          {/* Descripción */}
          <p className="card-text text-secondary mb-3">
            {obra.deskribapena}
          </p>

          {/* SECCIÓN CLAVE: LOCALIZACIÓN (Dónde está la obra) */}
          <div className="p-3 bg-light rounded-3 border-start border-4 border-warning">
            <h6 className="fw-bold text-dark mb-1" style={{fontSize: '0.9rem'}}>
              <FaInfoCircle className="me-2 text-warning"/> 
              Non dago eskuragarri?
            </h6>
            
            {/* Lógica: Si tiene URL es una web, si no, es un sitio físico */}
            {obra.urlWeb ? (
              <a href={obra.urlWeb} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none fw-bold small">
                <FaGlobe className="me-2" />
                Webgunean ikusi ({obra.kokalekua})
              </a>
            ) : (
              <span className="text-muted fw-bold small">
                <FaMapMarkerAlt className="me-2 text-danger" />
                {obra.kokalekua} (Fisikoa)
              </span>
            )}
          </div>

        </div>

        {/* --- FOOTER: Botones de Acción --- */}
        <div className="card-footer bg-white border-top-0 d-flex align-items-center py-3 px-3 rounded-bottom-4">
          
          {/* Like */}
          <button 
            className="btn btn-light rounded-circle me-2 text-center d-flex align-items-center justify-content-center" 
            style={{width: '40px', height: '40px'}}
            onClick={() => setLiked(!liked)}
          >
            {liked ? <FaHeart className="text-danger" /> : <FaRegHeart className="text-muted" />}
          </button>

          {/* Share */}
          <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
            <FaShareAlt className="text-muted" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ObraCard;