import React, { useState } from 'react';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaCheckCircle, FaPhone, FaMapMarkerAlt, FaCity } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Erregistratu = () => {
  // 1. ESTADO: Añadimos los nuevos campos (telefonoa, helbidea, hiria)
  const [formData, setFormData] = useState({
    izena: '',
    abizenak: '',
    email: '',
    telefonoa: '',   
    kalea: '',   
    hiria: '',      
    pasahitza: '',
    pasahitzaKonfirmatu: ''
  });

  const [errorea, setErrorea] = useState('');
  const [erregistratua, setErregistratua] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorea('');

    // Validaciones
    if (formData.pasahitza !== formData.pasahitzaKonfirmatu) {
      setErrorea('Pasahitzak ez datoz bat. (Las contraseñas no coinciden)');
      return;
    }
    if (formData.pasahitza.length < 6) {
      setErrorea('Pasahitzak gutxienez 6 karaktere izan behar ditu.');
      return;
    }

    console.log('Erregistratzeko datu osoak:', formData);
    setErregistratua(true);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7"> {/* Un poco más ancho para que quepan bien los datos */}
          
          <div className="card shadow-lg border-0 rounded-4">
            
            <div className="card-header bg-warning text-dark text-center py-4 rounded-top-4">
              <h2 className="fw-bold mb-0">
                <FaUserPlus className="me-2" /> 
                Sortu kontu berria
              </h2>
              <p className="small mb-0 text-dark-50">Osatu zure profila Artetxean sartzeko</p>
            </div>

            <div className="card-body p-5 bg-white">
              
              {erregistratua ? (
                <div className="text-center py-5">
                  <FaCheckCircle className="text-success display-1 mb-3" />
                  <h3 className="fw-bold text-success">Ongi etorri!</h3>
                  <p className="lead">Zure kontua ondo sortu da.</p>
                  <Link to="/" className="btn btn-dark mt-3 rounded-pill px-4">
                    Joan Hasierara
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  
                  {errorea && (
                    <div className="alert alert-danger text-center" role="alert">
                      {errorea}
                    </div>
                  )}

                  {/* SECCIÓN 1: DATOS PERSONALES */}
                  <h5 className="mb-3 text-warning fw-bold border-bottom pb-2">Datu Pertsonalak</h5>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted small">Izena *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><FaUser className="text-muted"/></span>
                        <input type="text" className="form-control bg-light border-start-0" name="izena" value={formData.izena} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted small">Abizenak *</label>
                      <input type="text" className="form-control bg-light" name="abizenak" value={formData.abizenak} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted small">Posta Elektronikoa *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-muted"/></span>
                        <input type="email" className="form-control bg-light border-start-0" name="email" placeholder="adibidea@email.com" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>
                    {/* NUEVO CAMPO: TELÉFONO */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted small">Telefonoa *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><FaPhone className="text-muted"/></span>
                        <input type="tel" className="form-control bg-light border-start-0" name="telefonoa" placeholder="600 00 00 00" value={formData.telefonoa} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 2: DIRECCIÓN (NUEVA) */}
                  <h5 className="mb-3 mt-4 text-warning fw-bold border-bottom pb-2">Helbidea</h5>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted small">Kalea / Dirección *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaMapMarkerAlt className="text-muted"/></span>
                      <input type="text" className="form-control bg-light border-start-0" name="helbidea" placeholder="Kale Nagusia, 1" value={formData.helbidea} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted small">Hiria / Ciudad *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaCity className="text-muted"/></span>
                      <input type="text" className="form-control bg-light border-start-0" name="hiria" placeholder="Donostia" value={formData.hiria} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* SECCIÓN 3: SEGURIDAD */}
                  <h5 className="mb-3 mt-4 text-warning fw-bold border-bottom pb-2">Segurtasuna</h5>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted small">Pasahitza *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><FaLock className="text-muted"/></span>
                        <input type="password" className="form-control bg-light border-start-0" name="pasahitza" value={formData.pasahitza} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-bold text-muted small">Errepikatu Pasahitza *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><FaLock className="text-muted"/></span>
                        <input type="password" className="form-control bg-light border-start-0" name="pasahitzaKonfirmatu" value={formData.pasahitzaKonfirmatu} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-2">
                    <button type="submit" className="btn btn-dark fw-bold py-2 shadow-sm">
                      Erregistratu
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {!erregistratua && (
              <div className="card-footer bg-light text-center py-3 border-0 rounded-bottom-4">
                <small className="text-muted">Dagoeneko kontua duzu? 
                <Link 
                   to="/saioa-hasi" 
                   className="text-warning fw-bold text-decoration-none ms-1"
                >
                   Saioa hasi
                 </Link></small>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Erregistratu;