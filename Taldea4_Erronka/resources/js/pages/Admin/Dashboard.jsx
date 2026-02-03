import React, { useState } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';


const Dashboard = ({ stats, azkenObrak }) => {
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    // FORMULARIOA
    const { data, setData, post, processing, errors, reset } = useForm({
        izenburua: '',
        artista: '',
        data: new Date().getFullYear().toString(),
        mota: 'modernoa',
        deskribapena: '',
        kokalekua: '',
        irudia: null,
        
        // EGOERA BERRIA: 'galeria', 'denda', edo 'enkantea'
        egoera: 'galeria', 
        
        prezioa: '',           // Dendako prezioa
        hasierako_prezioa: '', // Enkante prezioa
        enkante_amaiera: ''    // Enkante data
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Garbitu behar ez diren datuak bidali aurretik
        if (data.egoera === 'galeria') {
            data.prezioa = null;
            data.hasierako_prezioa = null;
            data.enkante_amaiera = null;
        } else if (data.egoera === 'denda') {
            data.hasierako_prezioa = null;
            data.enkante_amaiera = null;
        } else if (data.egoera === 'enkantea') {
            data.prezioa = null;
        }

        post('/admin/obrak', {
            onSuccess: () => {
                alert("✅ Obra ondo gorde da!");
                setShowModal(false);
                reset();
                window.location.reload(); // Ziurtatzeko zerrenda eguneratzen dela
            },
            onError: (err) => {
                console.error(err);
                alert("❌ Errorea: Begiratu datuak ondo dauden.");
            }
        });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Admin Panela" />
        

            <div className="container py-5 flex-grow-1">
                {/* GOIBURUA */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-bold text-dark">Admin Panela ⚙️</h1>
                        <p className="text-muted">Ongi etorri, {auth.user.izena}.</p>
                    </div>
                    <button className="btn btn-warning btn-lg fw-bold shadow-sm" onClick={() => setShowModal(true)}>
                        + IGO OBRA BERRIA
                    </button>
                </div>

                {/* ESTATISTIKAK */}
                <div className="row g-4 mb-5">
                    <StatCard title="Erabiltzaileak" value={stats.erabiltzaileak} color="primary" icon="👥" />
                    <StatCard title="Guztira Obrak" value={stats.obrak_guztira} color="success" icon="🎨" />
                    <StatCard title="Enkante Aktiboak" value={stats.enkantean} color="warning" icon="🔨" darkText />
                    <StatCard title="Salmentak" value={stats.salmentak} color="danger" icon="💰" />
                </div>

                {/* ZERRENDA */}
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3">
                        <h5 className="mb-0 fw-bold">Azken Gehikuntzak</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Irudia</th>
                                    <th>Izenburua</th>
                                    <th>Mota</th>
                                    <th>Egoera</th>
                                </tr>
                            </thead>
                            <tbody>
                                {azkenObrak.map((obra) => (
                                    <tr key={obra.id}>
                                        <td><img src={obra.irudia} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                                        <td className="fw-bold">{obra.izenburua}<br/><small className="text-muted">{obra.artista}</small></td>
                                        <td><span className="badge bg-secondary">{obra.mota}</span></td>
                                        <td>
                                            {obra.enkante_amaiera ? <span className="badge bg-warning text-dark">Enkantea</span> :
                                             obra.prezioa ? <span className="badge bg-success">Salmenta</span> :
                                             <span className="badge bg-info text-dark">Galeria</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODALA */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">🎨 Obra Berria Sortu</h5>
                                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        {/* DATU OROKORRAK */}
                                        <div className="col-md-6"><label>Izenburua</label><input type="text" className="form-control" value={data.izenburua} onChange={e => setData('izenburua', e.target.value)} required /></div>
                                        <div className="col-md-6"><label>Artista</label><input type="text" className="form-control" value={data.artista} onChange={e => setData('artista', e.target.value)} required /></div>
                                        <div className="col-md-4"><label>Urtea</label><input type="number" className="form-control" value={data.data} onChange={e => setData('data', e.target.value)} required /></div>
                                        <div className="col-md-4"><label>Mota</label>
                                            <select className="form-select" value={data.mota} onChange={e => setData('mota', e.target.value)}>
                                                <option value="klasikoa">Klasikoa</option>
                                                <option value="modernoa">Modernoa</option>
                                                <option value="urbanoa">Urbanoa</option>
                                                <option value="eskultura">Eskultura</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4"><label>Kokalekua</label><input type="text" className="form-control" value={data.kokalekua} onChange={e => setData('kokalekua', e.target.value)} required /></div>
                                        <div className="col-12"><label>Deskribapena</label><textarea className="form-control" rows="3" value={data.deskribapena} onChange={e => setData('deskribapena', e.target.value)} required></textarea></div>
                                        <div className="col-12"><label className="fw-bold">Irudia</label><input type="file" className="form-control" onChange={e => setData('irudia', e.target.files[0])} required /></div>

                                        <hr className="my-4" />

                                        {/* EGOERA AUKERATU */}
                                        <div className="col-12">
                                            <label className="form-label fw-bold fs-5">📌 Non argitaratu nahi duzu?</label>
                                            <select className="form-select form-select-lg border-warning" value={data.egoera} onChange={e => setData('egoera', e.target.value)}>
                                                <option value="galeria">🏛️ GALERIA HUTSA (Erakusketa bakarrik)</option>
                                                <option value="denda">🛒 DENDA (Salmenta zuzena)</option>
                                                <option value="enkantea">🔨 ENKANTEA (Subasta)</option>
                                            </select>
                                        </div>

                                        {/* AUKERAREN ARABERAKO EREMUAK */}
                                        {data.egoera === 'denda' && (
                                            <div className="col-md-6 bg-success p-3 rounded bg-opacity-10 mt-3 animate__animated animate__fadeIn">
                                                <label className="form-label fw-bold">Salmenta Prezioa (€)</label>
                                                <input type="number" className="form-control" value={data.prezioa} onChange={e => setData('prezioa', e.target.value)} required />
                                            </div>
                                        )}

                                        {data.egoera === 'enkantea' && (
                                            <div className="row mt-3 bg-warning p-3 rounded bg-opacity-10 animate__animated animate__fadeIn">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Hasierako Prezioa (€)</label>
                                                    <input type="number" className="form-control" value={data.hasierako_prezioa} onChange={e => setData('hasierako_prezioa', e.target.value)} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Amaiera Data</label>
                                                    <input type="datetime-local" className="form-control" value={data.enkante_amaiera} onChange={e => setData('enkante_amaiera', e.target.value)} required />
                                                </div>
                                            </div>
                                        )}
                                        
                                        {data.egoera === 'galeria' && (
                                            <div className="col-12 mt-2 text-muted fst-italic">
                                                * Obra hau Galerian agertuko da baina ezingo da erosi ezta pujatu ere.
                                            </div>
                                        )}

                                    </div>
                                    <div className="modal-footer border-0 px-0 mt-4">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Utzi</button>
                                        <button type="submit" className="btn btn-primary fw-bold" disabled={processing}>
                                            {processing ? 'Gordetzen...' : '💾 GORDE OBRA'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

          
        </div>
    );
};

const StatCard = ({ title, value, color, icon, darkText }) => (
    <div className="col-md-3">
        <div className={`card bg-${color} text-${darkText ? 'dark' : 'white'} border-0 shadow h-100`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-title mb-0 text-uppercase opacity-75">{title}</h6>
                    <span className="fs-4">{icon}</span>
                </div>
                <h2 className="display-6 fw-bold mb-0">{value}</h2>
            </div>
        </div>
    </div>
);

export default Dashboard;