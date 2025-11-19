import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/navegation/ProtegerRutas.jsx";
import Inicio from "./views/Inicio.jsx";
import Bienvenido from "./views/Bienvenido.jsx";
import Alquileres from "./views/Alquiler.jsx";
import Coches from "./views/Coches.jsx";
import Usuarios from "./views/Usuarios.jsx";
import Empleados from "./views/Empleados.jsx";
import Capacitacion from "./views/Capacitacion.jsx";
import Mantenimiento from "./views/Mantenimiento.jsx"; 
import LayoutPublico from "./components/navegation/LayoutPublico.jsx";
import LayoutPrivado from "./components/navegation/LayoutPrivado.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* PÚBLICO */}
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
        </Route>

        {/* PRIVADO CON PROTECCIÓN */}
        <Route element={<LayoutPrivado />}>
          {/* INICIO Y ALQUILER → TODOS */}
          <Route
            path="/bienvenido"
            element={
              <ProtectedRoute allowedRoles={["Usuario", "Administrador", "Agente de alquiler", "Mecánico"]}>
                <Bienvenido />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alquiler"
            element={
              <ProtectedRoute allowedRoles={["Usuario", "Administrador", "Agente de alquiler"]}>
                <Alquileres />
              </ProtectedRoute>
            }
          />

          {/* SOLO ADMIN */}
          <Route
            path="/coches"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <Coches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empleados"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <Empleados />
              </ProtectedRoute>
            }
          />
          <Route
            path="/capacitacion"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <Capacitacion />
              </ProtectedRoute>
            }
          />

          {/* SOLO MECÁNICO */}
          <Route
            path="/mantenimiento"
            element={
              <ProtectedRoute allowedRoles={["Mecánico", "Administrador"]}>
                <Mantenimiento />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;