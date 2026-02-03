import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaGavel, FaShoppingCart, FaUserFriends, FaArrowRight } from 'react-icons/fa';

const Hasiera = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Hasiera - Artetxea" />

            {/* --- HERO SECTION (PORTADA) --- */}
            <div 
                className="hero-section d-flex align-items-center justify-content-center text-center text-white position-relative"
                style={{
                    backgroundImage: "url('/assets/irudi2.jpg')", // Ziurtatu irudia existitzen dela
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '85vh', // Pantaila ia osoa bete
                    marginTop: '20px' // Navbar-arekin ondo pegatzeko
                }}
            >
                {/* Iragazki iluna testua irakurtzeko */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

                <div className="position-relative z-1 px-4">
                    <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                        ONGI ETORRI <span style={{ color: '#ffc107' }}>ARTETXERA</span>
                    </h1>
                    <p className="lead fs-3 mb-5 fw-light">
                        Euskal Herriko artearen txoko digitala. Ezagutu, partekatu eta bizi artea.
                    </p>
                    
                    {/* CALL TO ACTION BOTOIAK */}
                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                        <Link href="/galeria" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold rounded-pill">
                            IKUSI GALERIA
                        </Link>
                        <Link href="/erregistratu" className="btn btn-warning btn-lg px-5 py-3 fw-bold rounded-pill text-dark shadow-lg">
                            BATU ZAITEZ ORAIN <FaArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- ZERGATIK ERREGISTRATU? (BENEFITS SECTION) --- */}
            <div className="container py-5 mt-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-6">Zergatik sortu kontua?</h2>
                    <p className="text-muted fs-5">Erregistratzeak abantaila esklusiboak ematen dizkizu.</p>
                    <div style={{ width: '60px', height: '4px', background: '#ffc107', margin: '10px auto' }}></div>
                </div>

                <div className="row g-4 text-center">
                    {/* Txartela 1 */}
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-effect">
                            <div className="mb-3 text-warning">
                                <FaGavel size={50} />
                            </div>
                            <h4 className="fw-bold">Parte Hartu Enkanteetan</h4>
                            <p className="text-muted">
                                Bakarrik erregistratutako erabiltzaileek egin ditzakete pujak gure enkante esklusiboetan. Ez galdu aukera!
                            </p>
                        </div>
                    </div>

                    {/* Txartela 2 */}
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-effect">
                            <div className="mb-3 text-success">
                                <FaShoppingCart size={50} />
                            </div>
                            <h4 className="fw-bold">Erosi Zuzenean</h4>
                            <p className="text-muted">
                                Gustuko duzun obra bat ikusi duzu? Gehitu saskira eta erosi segurtasun osoz gure dendan.
                            </p>
                        </div>
                    </div>

                    {/* Txartela 3 */}
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm p-4 hover-effect">
                            <div className="mb-3 text-primary">
                                <FaUserFriends size={50} />
                            </div>
                            <h4 className="fw-bold">Komunitatea eta Forua</h4>
                            <p className="text-muted">
                                Eman zure iritzia, baloratu obrak ("Like") eta parte hartu gure foruko eztabaidetan beste arte zaleekin.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FINAL CTA */}
                <div className="text-center mt-5">
                    <div className="p-5 rounded-3 text-white" style={{ background: 'linear-gradient(45deg, #212529, #343a40)' }}>
                        <h2 className="fw-bold">Prest zaude hasteko?</h2>
                        <p className="fs-5 mb-4 opacity-75">Sartzea guztiz doakoa da eta minutu bat baino gutxiago behar da.</p>
                        <Link href="/erregistratu" className="btn btn-warning btn-lg px-5 py-3 fw-bold rounded-pill text-dark scale-up-btn">
                            SORTU KONTUA DOAN
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* CSS txiki bat animazioetarako (Fitxategi berean jar dezakezu azpian edo CSS fitxategi batean) */}
            <style>{`
                .hover-effect { transition: transform 0.3s; }
                .hover-effect:hover { transform: translateY(-10px); }
                .scale-up-btn { transition: transform 0.2s; }
                .scale-up-btn:hover { transform: scale(1.05); }
            `}</style>
        </div>
    );
};

export default Hasiera;