import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaFilter } from 'react-icons/fa'; 

const Galeria = ({ obrak }) => {
    const { auth } = usePage().props;
    const [mapaObra, setMapaObra] = useState(null);
    
    // FILTROAREN EGOERA (Berreskuratuta!)
    const [filtroa, setFiltroa] = useState('guztiak');

    const handleLike = (id) => {
        if (!auth.user) return alert("⚠️ Like bat emateko saioa hasi behar duzu!");
        router.post(`/obrak/${id}/like`, {}, { preserveScroll: true });
    };

    // Obrak filtratu aukeratutako motaren arabera
    const obrakFiltratuta = filtroa === 'guztiak' ? obrak : obrak.filter(o => o.mota.toLowerCase() === filtroa.toLowerCase());

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Galeria - Artetxea" />


            <div className="container py-5 flex-grow-1">
                <h1 className="fw-bold text-center mb-4 text-dark">Galeria Erakusketa 🏛️</h1>
                
                {/* --- FILTROEN BOTOIAK --- */}
                <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
                    <button className={`btn rounded-pill px-4 fw-bold ${filtroa === 'guztiak' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFiltroa('guztiak')}>
                        <FaFilter className="me-2"/> Guztiak
                    </button>
                    <button className={`btn rounded-pill px-4 fw-bold ${filtroa === 'klasikoa' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFiltroa('klasikoa')}>Klasikoa</button>
                    <button className={`btn rounded-pill px-4 fw-bold ${filtroa === 'modernoa' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFiltroa('modernoa')}>Modernoa</button>
                    <button className={`btn rounded-pill px-4 fw-bold ${filtroa === 'urbanoa' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFiltroa('urbanoa')}>Urbanoa</button>
                    <button className={`btn rounded-pill px-4 fw-bold ${filtroa === 'eskultura' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFiltroa('eskultura')}>Eskultura</button>
                </div>

                <div className="row g-4">
                    {obrakFiltratuta.length === 0 && <div className="text-center text-muted fs-5">Ez dago kategoria honetako obrarik.</div>}
                    
                    {obrakFiltratuta.map((obra) => (
                        <div className="col-md-4" key={obra.id}>
                            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                <img src={obra.irudia} className="card-img-top" style={{ height: '280px', objectFit: 'cover' }} alt={obra.izenburua} />
                                <div className="card-body pb-2">
                                    <h5 className="fw-bold mb-1 text-dark">{obra.izenburua}</h5>
                                    <p className="text-muted mb-2">{obra.artista}</p>
                                    <span className="badge bg-secondary mb-3 text-uppercase">{obra.mota}</span>
                                </div>
                                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center pb-4 px-4">
                                    <button onClick={() => setMapaObra(obra)} className="btn btn-dark d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm">
                                        <FaMapMarkerAlt className="text-warning" /> Ikusi Mapan
                                    </button>
                                    <button onClick={() => handleLike(obra.id)} className={`btn d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm ${obra.is_liked ? 'btn-danger' : 'btn-light border'}`} style={{ transition: '0.2s' }}>
                                        {obra.is_liked ? <FaHeart className="text-white fs-5" /> : <FaRegHeart className="text-danger fs-5" />}
                                        <span className={`fw-bold fs-5 ${obra.is_liked ? 'text-white' : 'text-dark'}`}>{obra.likes_count}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MODAL MAPA --- */}
            {mapaObra && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="modal-header bg-dark text-white border-bottom-0">
                                <h5 className="modal-title fw-bold"><FaMapMarkerAlt className="text-warning me-2" /> {mapaObra.izenburua} - Kokalekua</h5>
                                <button className="btn-close btn-close-white" onClick={() => setMapaObra(null)}></button>
                            </div>
                            <div className="modal-body p-0">
                                <iframe width="100%" height="400" style={{ border: 0 }} loading="lazy" allowFullScreen src={`https://maps.google.com/maps?q=${encodeURIComponent(mapaObra.kokalekua)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Galeria;