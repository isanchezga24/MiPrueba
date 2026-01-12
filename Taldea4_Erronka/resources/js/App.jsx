import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout.jsx'; 
import Hasiera from './pages/Hasiera.jsx';
import Galeria from './pages/Galeria.jsx';

import Kontaktua from './pages/Kontaktua.jsx';
import Erregistratu from './pages/Erregistratu.jsx';
import Enkanteak from './pages/Enkanteak.jsx';
import Erosketak from './pages/Erosketak.jsx';

function App() {
  return (

    <BrowserRouter>
    
      <Routes>
     
        <Route path="/" element={<Layout />}> 
          
    
          <Route index element={<Hasiera />} />
          <Route path="galeria" element={<Galeria />} />
          
          <Route path="kontaktua" element={<Kontaktua />} /> 
          <Route path="erregistratu" element={<Erregistratu />} />
          <Route path='enkanteak' element={<Enkanteak/>}/>
          <Route path='erosketak' element={<Erosketak/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;