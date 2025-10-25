import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaCoches from "../components/coches/TablaCoches.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";

const Coches = () => {

  const [coches, setCoches] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [cochesFiltrados, setCochesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const obtenerCoches = async () => {
    try{
      const respuesta = await fetch("http://localhost:3000/api/Coches");
      if(!respuesta.ok) {
        throw new Error("Error al obtemer los clientes");
      }

      const datos = await respuesta.json();

      setCoches(datos);
      setCochesFiltrados(datos);
      setCargando(false);
    }catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = coches.filter(
      (coche) => 
        coche.Marca.toLowerCase().includes(texto) ||
        coche.Modelo.toLowerCase().includes(texto) ||
        coche.Placa.toLowerCase().includes(texto) ||
        coche.Color.toLowerCase().includes(texto) ||
        coche.Estado.toLowerCase().includes(texto) 
    );
    setCochesFiltrados(filtrados)
  };

  useEffect(() => {
    obtenerCoches();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h4>Coches</h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusqueda
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>
        <TablaCoches
        coches={cochesFiltrados}
        cargando={cargando}
        />
      </Container>
    </>
  );
};  

export default Coches;