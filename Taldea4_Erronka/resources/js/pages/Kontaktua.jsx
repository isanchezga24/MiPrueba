import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Kontaktua = () => {
    // Backend-etik (Controller-etik) datozen mezuak jasotzeko (adibidez: "Ondo bidali da")
    const { flash } = usePage().props;

    // Formularioa kudeatzeko Inertia tresna
    const { data, setData, post, processing, errors, reset } = useForm({
        izena: '',
        email: '',
        mezua: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontaktua', {
            onSuccess: () => {
                alert("✅ Zure mezua ondo bidali da!");
                reset(); // Formularioa garbitu
            }
        });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Kontaktua - Artetxea" />

            <div className="container py-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5 text-dark">Jarri gurekin harremanetan</h1>
                    <p className="text-muted fs-5">Edozein zalantza edo galdera baduzu, idatziguzu.</p>
                </div>

                <div className="row g-5">
                    {/* INFORMAZIOA */}
                    <div className="col-md-5">
                        <div className="bg-dark text-white p-5 rounded-4 shadow h-100">
                            <h3 className="fw-bold mb-4" style={{ color: '#ffc107' }}>Artetxea Galeria</h3>
                            
                            <div className="d-flex align-items-center mb-4">
                                <FaMapMarkerAlt size={24} className="text-warning me-3" />
                                <div>
                                    <h5 className="mb-0 fw-bold">Helbidea</h5>
                                    <p className="mb-0 text-light opacity-75">Arte Kalea 12, 48005 Bilbo, Bizkaia</p>
                                </div>
                            </div>
                            
                            <div className="d-flex align-items-center mb-4">
                                <FaPhoneAlt size={24} className="text-warning me-3" />
                                <div>
                                    <h5 className="mb-0 fw-bold">Telefonoa</h5>
                                    <p className="mb-0 text-light opacity-75">+34 944 123 456</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <FaEnvelope size={24} className="text-warning me-3" />
                                <div>
                                    <h5 className="mb-0 fw-bold">Emaila</h5>
                                    <p className="mb-0 text-light opacity-75">info@artetxea.eus</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORMULARIOA */}
                    <div className="col-md-7">
                        <div className="bg-white p-5 rounded-4 shadow-sm h-100">
                            <h3 className="fw-bold mb-4 text-dark">Bidali zure mezua</h3>
                            
                            {/* Ongi bidali dela abisatzeko mezua (aukerakoa, alert-az gain) */}
                            {flash?.success && (
                                <div className="alert alert-success fw-bold">
                                    {flash.success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Izena</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.izena ? 'is-invalid' : ''}`}
                                        value={data.izena}
                                        onChange={e => setData('izena', e.target.value)}
                                        placeholder="Zure izena"
                                        required 
                                    />
                                    {errors.izena && <div className="invalid-feedback">{errors.izena}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Posta elektronikoa</label>
                                    <input 
                                        type="email" 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="zure@emaila.com"
                                        required 
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Mezua</label>
                                    <textarea 
                                        className={`form-control ${errors.mezua ? 'is-invalid' : ''}`}
                                        rows="5"
                                        value={data.mezua}
                                        onChange={e => setData('mezua', e.target.value)}
                                        placeholder="Zure zalantzak edo iruzkinak idatzi hemen..."
                                        required
                                    ></textarea>
                                    {errors.mezua && <div className="invalid-feedback">{errors.mezua}</div>}
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-warning w-100 py-3 fw-bold text-dark fs-5 shadow-sm"
                                    disabled={processing}
                                    style={{ transition: 'all 0.3s' }}
                                >
                                    {processing ? 'BIDALTZEN...' : 'MEZUA BIDALI'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default Kontaktua;