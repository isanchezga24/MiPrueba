import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../components/Nav/Navbar';
import Footer from '../components/Footer/footer';
import ObraCard from '../components/ObraCard'; // <--- Orain txartelak erabiliko ditugu!

const Erosketak = ({ obras }) => { // <--- Controller-etik 'obras' jasotzen dugu
    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Arte Denda - Artetxea" />

            <div className="container py-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5 text-dark">Arte Denda 🛍️</h1>
                    <p className="text-muted fs-5">Erosi zure obra gogokoenak zuzenean, itxaron gabe.</p>
                </div>

                {/* PRODUKTUEN ZERRENDA (GRID) */}
                {obras.length > 0 ? (
                    <div className="row g-4">
                        {obras.map((obra) => (
                            <ObraCard key={obra.id} obra={obra} />
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-warning text-center">
                        Une honetan ez dago obrarik salgai. Saiatu beranduago!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Erosketak;