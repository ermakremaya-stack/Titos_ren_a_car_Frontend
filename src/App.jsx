import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Encabezado from "./components/navegation/Encabezado.jsx"

import Inicio from "./views/Inicio.jsx";
import Coches from "./views/Coches.jsx";


import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
        <main className='margen-superior-main'>
          <Routes>
            <Route path="/" element={<Inicio/>} />
            <Route path="/coches" element={<Coches/>} />
            <Route path="*" element={<h2> 404 - Pagina no encontrada</h2>} />
          </Routes>
        </main>
    </Router>
  );
}

export default App;