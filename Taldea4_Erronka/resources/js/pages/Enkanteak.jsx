import React from 'react';
import EnkanteCard from '../components/EnkanteCard';

// Reutilizamos las mismas imágenes que ya tienes cargadas en el proyecto
import obra1 from '../assets/irudi3.jpg'; 
import obra2 from '../assets/irudi2.jpg';
import obra3 from '../assets/irudia1graff.jpg';

const subastas = [
  {
    id: 1,
    izenburua: "Erregina Klasikoa",
    artista: "Mikel_Art",
    img: obra1,
    precioSalida: 1200,
    pujasTotal: 5,
    tiempoRestante: "14h 30m"
  },
  {
    id: 2,
    izenburua: "Udazkena Parkean",
    artista: "Ane_Pintura",
    img: obra2,
    precioSalida: 850,
    pujasTotal: 12,
    tiempoRestante: "04h 15m" // ¡Poco tiempo!
  },
  {
    id: 3,
    izenburua: "Graffiti Power",
    artista: "Kale_Soul",
    img: obra3,
    precioSalida: 300,
    pujasTotal: 2,
    tiempoRestante: "23h 05m"
  }
];

const Enkanteak = () => {
  return (
    <div className="container mt-5 mb-5">
      
      {/* Cabecera */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">
          Enkante <span className="text-warning">Aktiboak</span>
        </h2>
        <p className="lead text-muted">
          Parte hartu eta eskuratu obra esklusiboak. Eskaintza onenak irabazten du!
        </p>
      </div>

      {/* Grid de Subastas */}
      <div className="row">
        {subastas.map((obra) => (
          <EnkanteCard key={obra.id} obra={obra} />
        ))}
      </div>

    </div>
  );
};

export default Enkanteak;