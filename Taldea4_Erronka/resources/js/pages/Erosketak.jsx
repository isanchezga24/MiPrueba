import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { FaShoppingCart, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const Erosketak = ({ obras }) => {
    const { auth } = usePage().props;
    const [filtroa, setFiltroa] = useState('guztiak');

    const addToCart = async (obraId) => {
        if (!auth.user) {
            alert('Saskira gehitzeko saioa hasi behar duzu.');
            return;
        }
        try {
            const res = await axios.post('/cart/add', { obra_id: obraId });
            alert(res.data.message);
            window.dispatchEvent(new Event('cartUpdated')); 
        } catch (error) {
            alert(error.response?.data?.message || 'Errorea saskira gehitzean');
        }
    };

    // Obrak filtratu
    const obrakFiltratuta = filtroa === 'guztiak' ? obras : obras.filter(o => o.mota.toLowerCase() === filtroa.toLowerCase());

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Denda - Artetxea" />

            <div className="container py-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h1 className="fw-bold text-dark display-4">Artetxea Denda 🛒</h1>
                    <p className="text-muted fs-5">Erosi zure obra gogokoenak zuzenean gure bildumatik.</p>
                </div>

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
                    {obrakFiltratuta.length === 0 && <div className="text-center text-muted fs-5">Ez dago obrarik salgai kategoria honetan.</div>}

                    {obrakFiltratuta.map((obra) => (
                        <div className="col-md-4" key={obra.id}>
                            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                <img src={obra.irudia} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} alt={obra.izenburua} />
                                <div className="card-body pb-2 text-center">
                                    <h4 className="fw-bold mb-1 text-dark">{obra.izenburua}</h4>
                                    <p className="text-muted mb-3 fs-5">{obra.artista}</p>
                                    <span className="badge bg-secondary mb-3 text-uppercase">{obra.mota}</span>
                                    <h3 className="fw-bold text-success mb-3">{obra.prezioa} €</h3>
                                </div>
                                <div className="card-footer bg-white border-top-0 d-flex justify-content-center pb-4">
                                    {/* SASKIRA GEHITU BOTOIA BAKARRIK (Ez dago Likerik, ezta Konpartiturik ere) */}
                                    <button onClick={() => addToCart(obra.id)} className="btn btn-warning fw-bold fs-5 px-5 py-2 rounded-pill shadow-sm text-dark d-flex align-items-center gap-2">
                                        <FaShoppingCart /> Saskira Gehitu
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Erosketak;