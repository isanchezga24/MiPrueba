import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // <--- HAU INPORTATU BERRI DA
import '../../css/saski.css';
import { FaTimes, FaTrash, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

const ErosketaSaski = ({ onClose }) => {
    const [step, setStep] = useState('list'); 
    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const [formData, setFormData] = useState({
        izena: auth.user ? auth.user.izena : '',
        abizenak: '',
        helbidea: '',
        hiria: '',
        pk: '',
        txartela: ''
    });

    const fetchCart = async () => {
        if (!auth.user) return;
        try {
            const res = await axios.get('/cart');
            setCartItems(res.data);
        } catch (error) {
            console.error("Errorea", error);
        }
    };

    useEffect(() => {
        fetchCart();
        // Body-ri scroll-a kendu saskia irekita dagoen bitartean
        document.body.style.overflow = 'hidden';
        
        window.addEventListener('cartUpdated', fetchCart);
        
        return () => {
            window.removeEventListener('cartUpdated', fetchCart);
            // Body scroll-a berreskuratu ixtean
            document.body.style.overflow = 'unset';
        };
    }, []);

    const removeItem = async (id) => {
        try {
            await axios.delete(`/cart/${id}`);
            setCartItems(cartItems.filter(item => item.id !== id));
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error(error);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + Number(item.prezioa || 0), 0);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/erosi', { bidalketa: formData });
            alert("✅ Erosketa burutu da!");
            setCartItems([]);
            window.dispatchEvent(new Event('cartUpdated'));
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("❌ Errore bat gertatu da.");
        } finally {
            setLoading(false);
        }
    };

    // ALDAKETA NAGUSIA: createPortal erabiltzen dugu
    // Honek saskia zuzenean <body> etiketara mugitzen du, dena estaltzeko
    return createPortal(
        <div className="saski-overlay">
            <div className="saski-container">
                {/* GOIBURUA */}
                <div className="saski-header">
                    {step === 'form' && (
                        <button className="close-btn me-2" onClick={() => setStep('list')} style={{fontSize:'1rem'}}>
                            <FaArrowLeft />
                        </button>
                    )}
                    <h2>{step === 'list' ? 'Zure Saskia' : 'Bidalketa Datuak'}</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* GORPUTZA */}
                <div className="saski-body">
                    {step === 'list' ? (
                        cartItems.length === 0 ? (
                            <div className="text-center mt-5 text-muted">
                                <p style={{fontSize: '3rem'}}>🛒</p>
                                <p>Saskia hutsik dago.</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="saski-item">
                                    <img src={item.irudia} alt={item.izenburua} />
                                    <div className="item-details">
                                        <h4>{item.izenburua}</h4>
                                        <p>{item.artista}</p>
                                        <div className="price-tag">{item.prezioa}€</div>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            ))
                        )
                    ) : (
                        // FORMULARIOA
                        <form id="payment-form" onSubmit={handlePayment}>
                            <div className="mb-2"><label>Izena</label><input type="text" className="form-control" value={formData.izena} onChange={e=>setFormData({...formData, izena:e.target.value})} required/></div>
                            <div className="mb-2"><label>Abizenak</label><input type="text" className="form-control" value={formData.abizenak} onChange={e=>setFormData({...formData, abizenak:e.target.value})} required/></div>
                            <div className="mb-2"><label>Helbidea</label><input type="text" className="form-control" value={formData.helbidea} onChange={e=>setFormData({...formData, helbidea:e.target.value})} required/></div>
                            <div className="row mb-2">
                                <div className="col"><label>Hiria</label><input type="text" className="form-control" value={formData.hiria} onChange={e=>setFormData({...formData, hiria:e.target.value})} required/></div>
                                <div className="col"><label>PK</label><input type="text" className="form-control" value={formData.pk} onChange={e=>setFormData({...formData, pk:e.target.value})} required/></div>
                            </div>
                            <div className="mb-3 p-3 bg-white border rounded">
                                <label className="d-flex align-items-center gap-2 fw-bold"><FaCreditCard/> Txartela</label>
                                <input type="text" className="form-control mt-2" placeholder="0000 0000 0000 0000" required/>
                            </div>
                        </form>
                    )}
                </div>

                {/* OINA */}
                <div className="saski-footer">
                    <div className="total-row">
                        <span>GUZTIRA:</span>
                        <span>{total}€</span>
                    </div>
                    {step === 'list' ? (
                        <button className="checkout-btn" onClick={() => setStep('form')} disabled={cartItems.length===0}>
                            AURRERA JARRAITU
                        </button>
                    ) : (
                        <button form="payment-form" type="submit" className="checkout-btn bg-success text-white" disabled={loading}>
                            {loading ? 'Prozesatzen...' : 'ORDAINDU'}
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body // <--- HONA MUGITZEN DA SASKIA
    );
};

export default ErosketaSaski;