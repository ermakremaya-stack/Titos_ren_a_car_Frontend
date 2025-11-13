// src/components/navegation/Encabezado.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuarioTito")) || {};
  const rol = usuario.rol || "Invitado";

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);
  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  // MENÚS POR ROL (SEGÚN PERMISOS DE BD)
  const menus = {
    Usuario: [
      { label: "Inicio", ruta: "/bienvenido", icon: "bi-house-fill" },
      { label: "Alquiler", ruta: "/alquiler", icon: "bi-car-front" },
    ],
    Administrador: [
      { label: "Inicio", ruta: "/bienvenido", icon: "bi-house-fill" },
      { label: "Coches", ruta: "/coches", icon: "bi-car-front" },
      { label: "Empleados", ruta: "/empleados", icon: "bi-people-fill" },
      { label: "Usuarios", ruta: "/usuarios", icon: "bi-person-circle" },
      { label: "Alquiler", ruta: "/alquiler", icon: "bi-calendar-check" },
      { label: "Mantenimiento", ruta: "/mantenimiento", icon: "bi-tools" },
      { label: "Capacitación", ruta: "/capacitacion", icon: "bi-building-fill-gear" },
    ],
    "Agente de alquiler": [
      { label: "Inicio", ruta: "/bienvenido", icon: "bi-house-fill" },
      { label: "Alquiler", ruta: "/alquiler", icon: "bi-car-front" },
    ],
    Mecánico: [
      { label: "Inicio", ruta: "/bienvenido", icon: "bi-house-fill" },
      { label: "Mantenimiento", ruta: "/mantenimiento", icon: "bi-tools" },
    ],
  };

  const menuActual = menus[rol] || menus.Usuario;

  return (
    <Navbar expand="md" fixed="top" style={{ backgroundColor: "brown" }}>
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/bienvenido")}
          className="text-white fw-bold"
          style={{ cursor: "pointer" }}
        >
          Tito's Rent a Car
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="menu-offcanvas"
          onClick={manejarToggle}
          style={{ backgroundColor: "whitesmoke" }}
        />

        <Navbar.Offcanvas
          id="menu-offcanvas"
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {usuario.nombre ? `${usuario.nombre} (${rol})` : "Menú"}
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              {menuActual.map((item) => (
                <Nav.Link
                  key={item.ruta}
                  onClick={() => manejarNavegacion(item.ruta)}
                  className="text-dark"
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;