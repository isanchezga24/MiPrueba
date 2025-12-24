import React, { useState } from 'react';
import ObraCard from '../components/ObraCard'; 
import { FaFilter } from 'react-icons/fa';

// 1. ARTE KLASIKOA (Carpeta: Arte Klasiko)
import k1 from '../assets/Irudiak-Galeria/Arte Klasiko/Kirudi1.jpg';
import k2 from '../assets/Irudiak-Galeria/Arte Klasiko/Kirudi2.jpg';
import k3 from '../assets/Irudiak-Galeria/Arte Klasiko/Kirudi3.jpeg'; 
import k4 from '../assets/Irudiak-Galeria/Arte Klasiko/Kirudi4.jpg';

// 2. ARTE MODERNOA (Carpeta: Arte Moderno)
import m1 from '../assets/Irudiak-Galeria/Arte Moderno/Mirudi1.jpg';
import m2 from '../assets/Irudiak-Galeria/Arte Moderno/Mirudi2.jpg';
import m3 from '../assets/Irudiak-Galeria/Arte Moderno/Mirudi3.png'; 
import m4 from '../assets/Irudiak-Galeria/Arte Moderno/Mirudi4.jpg';

// 3. ARTE URBANOA (Carpeta: Arte Urbano)
import u1 from '../assets/Irudiak-Galeria/Arte Urbano/Uirudi2.png'; 
import u2 from '../assets/Irudiak-Galeria/Arte Urbano/Uirudi3.jpeg'; 
import u3 from '../assets/Irudiak-Galeria/Arte Urbano/Uirudi5.jpg';
import u4 from '../assets/Irudiak-Galeria/Arte Urbano/Uirudi7.jpg';

// 4. ESKULTURAK (Carpeta: Eskulturak)
import e1 from '../assets/Irudiak-Galeria/Eskulturak/Eskul1.jpg';
import e2 from '../assets/Irudiak-Galeria/Eskulturak/Eskul2.jpg';
import e3 from '../assets/Irudiak-Galeria/Eskulturak/Eskul3.jpg';
import e4 from '../assets/Irudiak-Galeria/Eskulturak/Eskul4.jpg';


const obrak = [
  // --- KLASIKOA ---
  {
    id: 101,
    izenburua: "Dama Klasikoa",
    artista: "Mikel_Classic",
    data: "1890",
    avatar: "M",
    color: "bg-primary",
    mota: "klasikoa",
    img: k1,
    deskribapena: "Erretratu klasikoa olioz egina, argi naturalarekin.",
    kokalekua: "Bilboko Arte Ederren Museoa"
  },
  {
    id: 102,
    izenburua: "Paisai Zaharra",
    artista: "Lorea_Art",
    data: "1905",
    avatar: "L",
    color: "bg-primary",
    mota: "klasikoa",
    img: k2,
    deskribapena: "Natura hila eta paisaia lasaia.",
    kokalekua: "Bilduma Pribatua"
  },
  {
    id: 103,
    izenburua: "Begirada Sakona",
    artista: "Unknown",
    data: "1910",
    avatar: "U",
    color: "bg-secondary",
    mota: "klasikoa",
    img: k3,
    deskribapena: "Errealismo handiko lana.",
    kokalekua: "San Telmo Museoa"
  },
  {
    id: 104,
    izenburua: "Loreak eta Argia",
    artista: "Klasiko_Master",
    data: "1920",
    avatar: "K",
    color: "bg-primary",
    mota: "klasikoa",
    img: k4,
    deskribapena: "Konposizio klasiko orekatua.",
    kokalekua: "Guggenheim"
  },

  // --- MODERNOA ---
  {
    id: 201,
    izenburua: "Abstrakzio Urdina",
    artista: "Modern_Jone",
    data: "2023",
    avatar: "J",
    color: "bg-info",
    mota: "modernoa",
    img: m1,
    deskribapena: "Forma geometrikoak eta kolore biziak.",
    kokalekua: "Tabakalera"
  },
  {
    id: 202,
    izenburua: "Kaos Ordenatua",
    artista: "Iker_Pint",
    data: "2024",
    avatar: "I",
    color: "bg-success",
    mota: "modernoa",
    img: m2,
    deskribapena: "Sentimenduen adierazpen librea mihise gainean.",
    kokalekua: "Artetxea Galeria"
  },
  {
    id: 203,
    izenburua: "Koloreen Dantza",
    artista: "Ane_M",
    data: "2024",
    avatar: "A",
    color: "bg-danger",
    mota: "modernoa",
    img: m3,
    deskribapena: "Akrilikoa eta teknika mistoa.",
    kokalekua: "Salgai"
  },
  {
    id: 204,
    izenburua: "Etorkizuna",
    artista: "Future_Art",
    data: "2024",
    avatar: "F",
    color: "bg-info",
    mota: "modernoa",
    img: m4,
    deskribapena: "Arte digitalaren inspirazioa olioan.",
    kokalekua: "Donostia"
  },

  // --- URBANOA ---
  {
    id: 301,
    izenburua: "Kalearen Ahotsa",
    artista: "Graff_King",
    data: "2024",
    avatar: "G",
    color: "bg-dark",
    mota: "urbanoa",
    img: u1,
    deskribapena: "Hormirudia spray bidez egina.",
    kokalekua: "Egia Tuneleko Hormak"
  },
  {
    id: 302,
    izenburua: "Spray & Soul",
    artista: "Urban_Queen",
    data: "2023",
    avatar: "U",
    color: "bg-warning",
    mota: "urbanoa",
    img: u2,
    deskribapena: "Errealismoa eta graffiti estiloa nahastuz.",
    kokalekua: "Skate Park"
  },
  {
    id: 303,
    izenburua: "Hiri Ametsak",
    artista: "Street_Art",
    data: "2024",
    avatar: "S",
    color: "bg-dark",
    mota: "urbanoa",
    img: u3,
    deskribapena: "Hiriko paisaia modernoak.",
    kokalekua: "Gros"
  },
  {
    id: 304,
    izenburua: "Underground",
    artista: "Mural_X",
    data: "2024",
    avatar: "X",
    color: "bg-secondary",
    mota: "urbanoa",
    img: u4,
    deskribapena: "Kultura urbanoaren adierazpena.",
    kokalekua: "Antigua"
  },

  // --- ESKULTURA ---
  {
    id: 401,
    izenburua: "Burdinazko Indarra",
    artista: "Iron_Man",
    data: "2020",
    avatar: "I",
    color: "bg-secondary",
    mota: "eskultura",
    img: e1,
    deskribapena: "Burdina forjatuzko eskultura abstraktua.",
    kokalekua: "Peine del Viento ingurua"
  },
  {
    id: 402,
    izenburua: "Harrizko Isiltasuna",
    artista: "Stone_Art",
    data: "2019",
    avatar: "S",
    color: "bg-dark",
    mota: "eskultura",
    img: e2,
    deskribapena: "Harrian landutako bustoa.",
    kokalekua: "Museoaren Lorategia"
  },
  {
    id: 403,
    izenburua: "Oreka",
    artista: "Balance_X",
    data: "2022",
    avatar: "B",
    color: "bg-success",
    mota: "eskultura",
    img: e3,
    deskribapena: "Zur eta metal nahasketa.",
    kokalekua: "Salgai"
  },
  {
    id: 404,
    izenburua: "Forma Organikoak",
    artista: "Natura_S",
    data: "2023",
    avatar: "N",
    color: "bg-primary",
    mota: "eskultura",
    img: e4,
    deskribapena: "Buztinezko eskultura modernoa.",
    kokalekua: "Tailerra"
  }
];

const Galeria = () => {
  const [filtroActivo, setFiltroActivo] = useState('denak');

  const obrasFiltradas = obrak.filter(obra => {
    if (filtroActivo === 'denak') return true;
    return obra.mota === filtroActivo;
  });

  return (
    <div className="container mt-5 mb-5">
      
      {/* Título */}
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5 font-heading">
          Arte <span className="text-warning">Galeria</span>
        </h2>
        <p className="text-muted lead">Ezagutu gure bilduma eta aurkitu zure estiloa.</p>
      </div>

      {/* --- BARRA DE FILTROS --- */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 rounded-pill p-2 bg-light">
            <div className="d-flex flex-wrap justify-content-center gap-2 align-items-center">
              
              <span className="text-muted fw-bold ms-3 me-2 d-none d-md-block">
                <FaFilter className="me-2" /> Iragazi:
              </span>

              <button 
                className={`btn rounded-pill px-4 fw-bold ${filtroActivo === 'denak' ? 'btn-dark' : 'btn-outline-secondary border-0'}`}
                onClick={() => setFiltroActivo('denak')}
              >
                Denak
              </button>
              
              <button 
                className={`btn rounded-pill px-3 fw-bold ${filtroActivo === 'klasikoa' ? 'btn-warning text-dark' : 'btn-outline-secondary border-0'}`}
                onClick={() => setFiltroActivo('klasikoa')}
              >
                Klasikoa
              </button>

              <button 
                className={`btn rounded-pill px-3 fw-bold ${filtroActivo === 'modernoa' ? 'btn-warning text-dark' : 'btn-outline-secondary border-0'}`}
                onClick={() => setFiltroActivo('modernoa')}
              >
                Modernoa
              </button>

              <button 
                className={`btn rounded-pill px-3 fw-bold ${filtroActivo === 'urbanoa' ? 'btn-warning text-dark' : 'btn-outline-secondary border-0'}`}
                onClick={() => setFiltroActivo('urbanoa')}
              >
                Urbanoa
              </button>

              <button 
                className={`btn rounded-pill px-3 fw-bold ${filtroActivo === 'eskultura' ? 'btn-warning text-dark' : 'btn-outline-secondary border-0'}`}
                onClick={() => setFiltroActivo('eskultura')}
              >
                Eskultura
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Grid de Obras */}
      <div className="row">
        {obrasFiltradas.length > 0 ? (
          obrasFiltradas.map((obra) => (
            <ObraCard key={obra.id} obra={obra} />
          ))
        ) : (
          <div className="text-center py-5">
            <p className="text-muted fs-5">Ez daude obra mota honetako emaitzarik...</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Galeria;