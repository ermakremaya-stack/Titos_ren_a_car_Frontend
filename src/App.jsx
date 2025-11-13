import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Inicio from "./views/Inicio.jsx";
import Coches from "./views/Coches.jsx";
import Empleados from "./views/Empleados.jsx";
import Usuarios from './views/Usuarios.jsx';
import Capacitacion from "./views/Capacitacion.jsx";
import Alquileres from './views/Alquiler.jsx';
import Bienvenido from './views/Bienvenida.jsx';
import LayoutPublico from './components/navegation/LayoutPublico.jsx';
import LayoutPrivado from './components/navegation/LayoutPrivado.jsx';
import "./App.css";


const App = () => {
  return (
    <Router>
    
        <main className='margen-superior-main'>
          <Routes>
            <Route element={<LayoutPublico />}>
              <Route path="/" element={<Inicio/>} />
              <Route path="/inicio" element={<Inicio />} />
            </Route>
            <Route element={<LayoutPrivado />}>
             <Route path="/" element={<Inicio/>} />
            <Route path="/coches" element={<Coches />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/capacitacion" element={<Capacitacion />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/alquiler" element={<Alquileres />} />
            <Route path="/bienvenido" element={<Bienvenido />} />
            </Route>
           
        
            <Route path="*" element={<h2> 404 - Pagina no encontrada</h2>} />
          </Routes>
        </main>
    </Router>
  );
}

export default App;