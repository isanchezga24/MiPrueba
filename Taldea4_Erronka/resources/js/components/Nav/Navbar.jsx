import React, { useState } from 'react';
import { MdStar } from 'react-icons/md';
import logo from '../../assets/logo-artetxea.png';
import './Navbar.css';
import { Link } from 'react-router-dom'; 


import LoginModal from '../LoginModal'; 

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  return (
    <div className="container mt-4">
      
      <nav className="navbar navbar-expand-lg custom-navbar px-3">
        
        <Link className="navbar-brand d-flex align-items-center" to="/">
           <img 
             src={logo} 
             alt="Artetxea Logo" 
             className="logo-img rounded-circle border border-dark" 
           />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/">HASIERA</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/galeria">GALERIA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/enkanteak">ENKANTEAK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">EROSKETAK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">FORUA</a> 
            </li>
            
            
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/kontaktua">KONTAKTUA</Link>
            </li>
            
            <li className="nav-item">
              <a className="ranking-icon position-relative d-flex align-items-center justify-content-center text-warning" href="#">
                <MdStar size={40} />
                <span className="position-absolute fw-bold text-white" style={{fontSize: '14px'}}>1</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto gap-2">   
                  
                  <button 
                    className="btn btn-outline-light btn-sm fw-bold rounded-pill px-3"
                    onClick={handleShowLogin} // 
                  >
                    Saioa hasi
                  </button>
                 <Link 
                    to="/erregistratu" 
                    className="btn btn-warning btn-sm fw-bold rounded-pill px-3 text-dark"
                  >
                    Erregistratu
                  </Link>
        </div>

      </nav>
      
      
      <LoginModal 
        show={showLoginModal} 
        handleClose={handleCloseLogin} 
      />

    </div>
  );
};

export default Navbar;