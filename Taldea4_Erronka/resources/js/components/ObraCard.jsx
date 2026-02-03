import React from 'react';
import { FaHeart, FaRegHeart, FaShareAlt, FaShoppingCart } from 'react-icons/fa';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios'; // Necesario para llamar al backend

const ObraCard = ({ obra }) => {
  const { auth } = usePage().props;

  const handleLike = () => {
    if (!auth.user) {
      alert("Saioa hasi behar duzu bozkatzeko!");
      return;
    }
    router.post(`/obra/${obra.id}/like`, {}, { preserveScroll: true });
  };

  const handleShare = async () => {
    const shareData = {
      title: `Artetxea - ${obra.izenburua}`,
      text: `Begira ${obra.artista}-ren obra zoragarri hau Artetxean!`,
      url: window.location.origin + '/galeria',
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareData.url);
    } catch (err) { console.log(err); }
  };

  // --- AÑADIR AL CARRITO (BD) ---
  const addToCart = async () => {
    if (!auth.user) {
        alert("Mesedez, saioa hasi saskira gehitzeko.");
        return;
    }

    try {
        // Petición al servidor
        const response = await axios.post('/cart', { obra_id: obra.id });
        alert(response.data.message);
        
        // Avisar al componente del carrito para que se actualice
        window.dispatchEvent(new Event('cartUpdated'));
        
    } catch (error) {
        if (error.response && error.response.status === 409) {
            alert("⚠️ " + error.response.data.message);
        } else {
            console.error(error);
            alert("Errorea gertatu da.");
        }
    }
  };

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow-sm obra-card position-relative">
        
        <button 
          onClick={handleShare}
          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center"
          style={{ width: '35px', height: '35px', zIndex: 10 }}
        >
          <FaShareAlt size={14} className="text-dark" />
        </button>

        <div className="overflow-hidden" style={{ height: '300px' }}>
          <img src={obra.irudia} className="card-img-top h-100 w-100" style={{ objectFit: 'cover' }} alt={obra.izenburua} />
        </div>
        
        <div className="card-body text-center d-flex flex-column">
          <h5 className="fw-bold mb-1">{obra.izenburua}</h5>
          <p className="text-muted small mb-2">{obra.artista}</p>
          
          <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
             <button onClick={handleLike} className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1" style={{ color: obra.is_liked ? '#dc3545' : '#6c757d' }}>
               {obra.is_liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
               <span className="fw-bold">{obra.likes_count}</span>
             </button>
             <span className="badge bg-warning text-dark">{obra.mota}</span>
          </div>

          {obra.prezioa && (
              <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold text-dark">{obra.prezioa}€</span>
                  <button onClick={addToCart} className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2">
                      <FaShoppingCart /> Gehitu
                  </button>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObraCard;