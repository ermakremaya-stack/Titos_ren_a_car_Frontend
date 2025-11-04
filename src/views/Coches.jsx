import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaCoches from "../components/coches/TablaCoches.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroCoche from "../components/coches/ModalRegistroCoches.jsx";
import ModalEdicionCategoria from '../components/coches/ModalEditarCoche.jsx';
import ModalEliminacionCategoria from '../components/coches/ModalEliminarCoche.jsx';


const Coches = () => {

  const [coches, setCoches] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [cochesFiltrados, setCochesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCoche, setNuevoCoche] = useState({
    marca: '',
    modelo: '',
    anio: 0,
    placa: '',
    color: '',
  });

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [cocheEditado, setCocheEditado] = useState(null);
  const [cocheAEliminar, setCocheAEliminar] = useState(null);


  const abrirModalEdicion = (coche) => {
    setCocheEditado({ ...coche });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!cocheEditado.placa.trim()) return;
    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcoche/${cocheEditado.id_coche}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cocheEditado)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar');
      setMostrarModalEdicion(false);
      await obtenerCoches();
    } catch (error) {
      console.error("Error al editar coche:", error);
      alert("No se pudo actualizar la coche.");
    }
  };


  const abrirModalEliminacion = (coche) => {
    setCocheAEliminar(coche);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarcoche/${cocheAEliminar.id_coche}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) throw new Error('Error al eliminar');
      setMostrarModalEliminar(false);
      setCocheAEliminar(null);
      await obtenerCoches();
    } catch (error) {
      console.error("Error al eliminar coche:", error);
      alert("No se pudo eliminar la coche.");
    }
  };



  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCoche(prev => ({ ...prev, [name]: value }));
  };

  const agregarCoche = async () => {
    if (!nuevoCoche.placa.trim()) return;

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcoche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCoche)
      });

      if (!respuesta.ok) throw new Error('Error al guardar');

      // Limpiar y cerrar
      setNuevoCoche({ marca: '', modelo: '', anio: 0, placa: '', color: '' });
      setMostrarModal(false);
      await obtenerCoches(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar el coche:", error);
      alert("No se pudo guardar el coche. Revisa la consola.");
    }
  };

  const obtenerCoches = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/Coches");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los coches");
      }

      const datos = await respuesta.json();

      setCoches(datos);
      setCochesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = coches.filter(
      (coche) =>
        coche.marca.toLowerCase().includes(texto) ||
        coche.modelo.toLowerCase().includes(texto) ||
        coche.placa.toLowerCase().includes(texto) ||
        coche.color.toLowerCase().includes(texto) ||
        coche.estado.toLowerCase().includes(texto)
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
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}

        />

        <ModalRegistroCoche
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoCoche={nuevoCoche}
          manejarCambioInput={manejarCambioInput}
          agregarCoche={agregarCoche}
        />

        <ModalEdicionCategoria
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          categoriaEditada={cocheEditado}
          setCategoriaEditada={setCocheEditado}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionCategoria
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          categoria={cocheAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />


      </Container>
    </>
  );
};

export default Coches;