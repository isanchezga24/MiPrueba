import React, { useState } from 'react';
import { FaShoppingCart, FaFilter } from 'react-icons/fa';

// 1. IMPORTAR EL COMPONENTE DEL CARRITO (Subimos un nivel con ../)
import ErosketaSaski from '../components/ErosketaSaski';

// 2. IMPORTAR TU CSS DE LA PÁGINA (si tienes uno para las tarjetas)
import '../../css/erosketak.css'; 

// --- IMÁGENES (Asegúrate de que las rutas sean correctas) ---
import k5 from '../assets/Irudiak-Galeria/Arte Klasiko/Kirudi5.jpg';
import k6 from '../assets/Irudiak-Galeria/Arte Klasiko/Kirudi6.jpg';
import m5 from '../assets/Irudiak-Galeria/Arte Moderno/Mirudi5.jpg';
import m6 from '../assets/Irudiak-Galeria/Arte Moderno/Mirudi6.jpg';
import u5 from '../assets/Irudiak-Galeria/Arte Urbano/Uirudi5.jpg';
import u6 from '../assets/Irudiak-Galeria/Arte Urbano/Uirudi6.webp';
import e5 from '../assets/Irudiak-Galeria/Eskulturak/Eskul5.jpg';
// (Añade el resto de tus imágenes aquí...)

const productos = [
  { id: 1, titulo: "Arratsaldea", artista: "Sorolla", precio: 1200, img: k5, mota: "klasikoa" },
  { id: 2, titulo: "Dama", artista: "Unknown", precio: 950, img: k6, mota: "klasikoa" },
  { id: 5, titulo: "Urdina", artista: "Ane M.", precio: 450, img: m5, mota: "modernoa" },
  { id: 6, titulo: "Kaosa", artista: "Xabi", precio: 600, img: m6, mota: "modernoa" },
  { id: 9, titulo: "Horma", artista: "Street K", precio: 250, img: u5, mota: "urbanoa" },
  { id: 10, titulo: "Neon", artista: "Cyber", precio: 320, img: u6, mota: "urbanoa" },
  { id: 13, titulo: "Burdina", artista: "Iron", precio: 2200, img: e5, mota: "eskultura" },
];

const Erosketak = () => {
  const [filtro, setFiltro] = useState('denak');
  
  // --- ESTADOS PARA EL CARRITO ---
  const [saskia, setSaskia] = useState([]); // Array con los productos comprados
  const [isSaskiaOpen, setIsSaskiaOpen] = useState(false); // Abrir/Cerrar modal

  // Filtrar productos
  const productosFiltrados = productos.filter(p => 
    filtro === 'denak' ? true : p.mota === filtro
  );

  // Función para AÑADIR al carrito
  const handleComprar = (producto) => {
    setSaskia([...saskia, producto]);
    setIsSaskiaOpen(true); // Opcional: Abre el carrito automáticamente al comprar
  };

  // Función para QUITAR del carrito
  const handleRemoveItem = (indexToRemove) => {
    setSaskia(saskia.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="container py-5">
      
      {/* --- AQUÍ RENDERIZAMOS EL MODAL DEL CARRITO --- */}
      {/* Le pasamos los estados y funciones como props */}
      <ErosketaSaski 
        isOpen={isSaskiaOpen} 
        onClose={() => setIsSaskiaOpen(false)} 
        items={saskia}
        onRemove={handleRemoveItem}
      />

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold display-5 font-heading">
            Arte <span className="text-warning">Denda</span>
          </h2>
          <p className="text-muted">Eraman ezazu artea zuzenean zure etxera.</p>
        </div>
        
        {/* BOTÓN PARA ABRIR EL CARRITO */}
        <div 
          className="position-relative" 
          style={{ cursor: 'pointer' }}
          onClick={() => setIsSaskiaOpen(true)}
        >
          <button className="btn btn-dark rounded-circle p-3 shadow hover-scale">
            <FaShoppingCart size={24} color="white" />
          </button>
          {saskia.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
              {saskia.length}
            </span>
          )}
        </div>
      </div>

      {/* FILTROS */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {['denak', 'klasikoa', 'modernoa', 'urbanoa', 'eskultura'].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setFiltro(tipo)}
            className={`btn rounded-pill px-4 text-capitalize fw-bold ${
              filtro === tipo ? 'btn-warning text-dark shadow' : 'btn-outline-dark'
            }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="row g-4">
        {productosFiltrados.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-3">
            {/* Usamos clase 'shop-card' de erosketak.css */}
            <div className="card h-100 shop-card"> 
              <div className="price-tag">{item.precio}€</div>
              <div className="shop-img-container">
                <img src={item.img} alt={item.titulo} className="shop-img" />
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title fw-bold mb-1">{item.titulo}</h5>
                <p className="text-muted fst-italic mb-3 small">By {item.artista}</p>
                
                <div className="mt-auto">
                  <button 
                    className="btn btn-dark w-100 rounded-pill"
                    onClick={() => handleComprar(item)}
                  >
                    Erosi Orain
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Erosketak;