import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaCoches from "../components/coches/TablaCoches.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroCoche from "../components/coches/ModalRegistroCoches.jsx";

const Coches = () => {

  const [coches, setCoches] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [cochesFiltrados, setCochesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCoche, setNuevoCoche] = useState({
    Marca: '',
    Modelo: '',
    Color: '',
    Placa: '',
  });

  
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCoche(prev => ({ ...prev, [name]: value }));
  };
  
  const agregarCoche = async () => {
    if (!nuevoCoche.Placa.trim()) return;

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcoche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCoche)
      });

      if (!respuesta.ok) throw new Error('Error al guardar');

      // Limpiar y cerrar
      setNuevoCoche({ Marca: '', Modelo: '', Anio: 0, Placa: '', Color: '', Fecha_Registro: Date() });
      setMostrarModal(false);
      await obtenerCoches(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("No se pudo guardar el producto. Revisa la consola.");
    }
  };

  const obtenerCoches = async () => {
    try{
      const respuesta = await fetch("http://localhost:3000/api/Coches");
      if(!respuesta.ok) {
        throw new Error("Error al obtener los coches");
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
          <Col className="text-end">
            <Button
              className="color-boton"
              onClick={() => setMostrarModal(true)}
            >
              + Nuevo Coche
            </Button>
            </Col>
        </Row>

        <TablaCoches
        coches={cochesFiltrados}
        cargando={cargando}
        />

        <ModalRegistroCoche
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCoche={nuevoCoche}
        manejarCambioInput={manejarCambioInput}
        agregarCoche={agregarCoche}
        />
      </Container>
    </>
  );
};  

export default Coches;