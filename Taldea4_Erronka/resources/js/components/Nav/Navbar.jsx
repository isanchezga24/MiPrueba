import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { FaBars, FaTimes, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import './Navbar.css';
import logo from '../../assets/logo-artetxea.png'; 
import LoginModal from '../LoginModal';
import ErosketaSaski from '../ErosketaSaski';

const Navbar = () => {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [isOpen, setIsOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    
    // SASKI KONTADOREA
    const [cartCount, setCartCount] = useState(0);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLogout = () => router.post('/logout');

    // Funtzioa: Zerbitzariari galdetu zenbat item dauden
    const updateCartCount = async () => {
        if (!user) {
            setCartCount(0);
            return;
        }
        try {
            const res = await axios.get('/cart');
            setCartCount(res.data.length);
        } catch (error) {
            console.error("Errorea saskia kontatzean", error);
        }
    };

    // 1. Hasieran kargatu
    // 2. Entzun 'cartUpdated' gertaera (ObraCard-ek jaurtitzen duena)
    useEffect(() => {
        updateCartCount();

        const handleCartUpdate = () => updateCartCount();
        window.addEventListener('cartUpdated', handleCartUpdate);
        
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, [user]);

    return (
        <nav className="navbar navbar-expand-lg custom-navbar px-3 shadow-sm">
            <div className="container-fluid">
                
                {/* LOGOA */}
                <Link href="/" className="navbar-brand d-flex align-items-center">
                    <img src={logo} alt="Artetxea Logo" className="logo-img rounded-circle border border-dark" />
                    <span className="ms-2 fw-bold text-white">ARTETXEA</span>
                </Link>

                {/* MENUA IREKI/ITXI (Mugikorra) */}
                <button className="navbar-toggler text-white" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* LOTURAK */}
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''} justify-content-center`}>
                    <ul className="navbar-nav align-items-center gap-4">
                        <li className="nav-item"><Link href="/" className="nav-link text-white">HASIERA</Link></li>
                        <li className="nav-item"><Link href="/galeria" className="nav-link text-white">GALERIA</Link></li>
                        <li className="nav-item"><Link href="/enkanteak" className="nav-link text-white">ENKANTEAK</Link></li>
                        <li className="nav-item"><Link href="/erosketak" className="nav-link text-white">DENDA</Link></li>
                        <li className="nav-item"><Link href="/forua" className="nav-link text-white">FORUA</Link></li>
                        <li className="nav-item"><Link href="/ranking" className="nav-link text-white">RANKING</Link></li>

                        {/* ADMIN BOTOIA */}
                        {user && user.rola === 'Administratzailea' && (
                            <li className="nav-item">
                                <Link href="/admin/dashboard" className="btn btn-warning btn-sm fw-bold text-dark">
                                    ADMIN ⚙️
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* ESKUINEKO BOTOIAK (User & Cart) */}
                    <div className="d-flex align-items-center ms-auto gap-3 mt-3 mt-lg-0">
                        
                        {/* --- SASKIA BOTOIA (ZENBAKIAREKIN) --- */}
                        <button 
                            className="btn text-white position-relative" 
                            onClick={() => setShowCart(true)} 
                            style={{ fontSize: '1.2rem' }}
                        >
                            <FaShoppingCart />
                            
                            {/* Hau da zenbakitxoa (Badge) */}
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.65rem' }}>
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* ERABILTZAILEA EDO LOGIN/ERREGISTRATU */}
                        {user ? (
                            <div className="d-flex align-items-center gap-2 text-white bg-dark px-3 py-1 rounded-pill border border-secondary">
                                <FaUserCircle className="text-warning" />
                                <span className="small text-uppercase fw-bold">{user.izena}</span>
                                <button onClick={handleLogout} className="btn btn-link text-danger p-0 ms-2" title="Saioa Itxi">
                                    <BiLogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            // HEMEN DAGO KONPONKETA: Bi botoiak agertzea
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-light btn-sm fw-bold rounded-pill" onClick={() => setShowLogin(true)}>
                                    Saioa Hasi
                                </button>
                            <Link 
                            href="/erregistratu" 
                            className="btn btn-warning btn-sm fw-bold rounded-pill text-dark btn-cta-nav" // <--- AÑADIDO btn-cta-nav
                            >
                            Erregistratu
                            </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MODALAK --- */}
            <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
            
            {/* Saskia ixten denean, kontadorea eguneratu */}
            {showCart && (
                <ErosketaSaski onClose={() => {
                    setShowCart(false);
                    updateCartCount(); 
                }} />
            )}
        </nav>
    );
};

export default Navbar;