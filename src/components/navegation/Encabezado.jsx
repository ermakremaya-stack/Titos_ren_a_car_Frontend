import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";


const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  //Alternar visibilidad del menu
  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  //Navegar y cerrar menu
  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  return (
    <Navbar expand="md" fixed="top" style={{ backgroundColor: "brown"}}>
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/inicio")}
          className="text-white fw-bold"
          style={{ cursor: "pointe" }}
        >
          Tito's rent a car
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="menu-offcanvas"
          onClick={manejarToggle}
          style={{ backgroundColor : "whitesmoke" }}
        />

        <Navbar.Offcanvas
          id="menu-offcanvas"
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú principal</Offcanvas.Title>
          </Offcanvas.Header>


          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/inicio")}
              >
                {mostrarMenu ? <i className="bi bi-house-fill"></i> : null} Inicio
              </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/coches")}
              >
                {mostrarMenu ? <i className='bi bi-car-front'></i> : null} Coches
              </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/empleados")}
              >
                {mostrarMenu ? <i className="bi-house-fill me-2"></i> : null} Empleados
              </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/usuarios")}
              >
                {mostrarMenu ? <i className="bi-house-fill me-2"></i> : null} Usuarios
              </Nav.Link>

              <Nav.Link
                className={mostrarMenu ? "texto-marca" : "text-white"}
                onClick={() => manejarNavegacion("/capacitacion")}
              >
                {mostrarMenu ? <i className="bi bi-building-fill-gear"></i> : null} Capacitación
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;