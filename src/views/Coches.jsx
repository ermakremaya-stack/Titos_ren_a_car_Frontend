import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaCoches from "../components/coches/TablaCoches.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroCoche from "../components/coches/ModalRegistroCoches.jsx";
import ModalEdicionCoche from "../components/coches/ModalEditarCoche.jsx";
import ModalEliminacionCoche from "../components/coches/ModalEliminarCoche.jsx";


const Coches = () => {

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de productos por página

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
    valor_dia: ''
  });

  // Calcular coches paginados
const cochesPaginadas = cochesFiltrados.slice(
  (paginaActual - 1) * elementosPorPagina,
  paginaActual * elementosPorPagina
);


  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [cocheEditado, setCocheEditado] = useState(null);
  const [cocheAEliminar, setCocheAEliminar] = useState(null);

  // ##############################################################################

  //Funsion para abrir el modal
  const abrirModalEdicion = (coche) => {
    console.log("Coche recivido para editar:", { ...coche })
    setCocheEditado({ ...coche });
    setMostrarModalEdicion(true);
  };

  //                ################################################

  const guardarEdicion = async () => {
    if (!cocheEditado.placa.trim()) {
      console.warn("No hay placa válida:", cocheEditado?.placa);
      return;
    }
    
    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcoche/${cocheEditado.id_coche}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cocheEditado)
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data.error || "No se pudo editar el coche");
        return;
      }

      if (!respuesta.ok) throw new Error('Error al actualizar');
      setMostrarModalEdicion(false);
      await obtenerCoches();
    } catch (error) {
      console.error("Error al editar coche:", error);
      alert("No se pudo actualizar la coche.");
    }
  };

  // ##########################################################################################

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

  // ###################################################################
  
  //Creamos coche
  const agregarCoche = async () => {
    if (!nuevoCoche.placa.trim()) return;

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcoche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCoche)
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data.error || "No se pudo guardar el coche");
        return;
      }

      // Limpiar y cerrar
      setNuevoCoche({ marca: '', modelo: '', anio: 0, placa: '', color: '', valor_dia: '' });
      setMostrarModal(false);
      await obtenerCoches(); // Refresca la lista

    } catch (error) {
      console.error("Error al agregar el coche:", error);
      alert("No se pudo guardar el coche.");
    }
  };

  // ################################################################################

  //Creamos funsion para obtener datos de los coches
  const obtenerCoches = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/Coches");
      const datos = await respuesta.json();
      setCoches(datos);
      if (!respuesta.ok) {
        throw new Error("Error al obtener los coches");
      }
      const cochesNormalizados = datos.map(c => ({
        id_coche: c.Id_Coche,
        marca: c.Marca,
        modelo: c.Modelo,
        anio: c.Anio,
        placa: c.Placa,
        color: c.Color,
        fecha_registro: c.Fecha_Registro,
        valor_dia: c.Valor_Dia,
        estado: c.Estado
      }));

      setCoches(cochesNormalizados);
      setCochesFiltrados(cochesNormalizados);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  // #################################################################
  
  //Creamos funsión para manejas cambios busquedas
  const [textoVisible, setTextoVisible] = useState("")

  setTextoVisible 

  const manejarCambioBusqueda = (e) => {
    //Almacenamos valores de forma original
    const original = e.target.value;
    setTextoVisible(original);
    //Comvertimos todo a minusculas para una busqueda más correcta
    const texto = e.target.value
    .toLowerCase()
    .normalize("NFD") // separa acentos de letras
    .replace(/[\u0300-\u036f]/g, ""); // elimina acentos
    setTextoBusqueda(texto);

    
    const filtrados = coches.filter(
      (coche) =>
        coche.marca.toLowerCase().includes(texto) ||
        coche.modelo.toLowerCase().includes(texto) ||
        coche.placa.toLowerCase().includes(texto) ||
        coche.color.toLowerCase().includes(texto) ||
        coche.estado.toLowerCase().includes(texto) ||
        coche.valor_dia.toLowerCase().includes(texto) ||
        coche.fecha_registro.toLowerCase().includes(texto)
    );
    setCochesFiltrados(filtrados)
  };

  useEffect(() => {
    obtenerCoches();
  }, []);

  return (
    <>
      <br/>
      <br/>
      <br/>
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

        <br />

        <TablaCoches
          coches={cochesPaginadas}
          cargando={cargando}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
          totalElementos={coches.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />

        <ModalRegistroCoche
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoCoche={nuevoCoche}
          manejarCambioInput={manejarCambioInput}
          agregarCoche={agregarCoche}
        />

        <ModalEdicionCoche
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          cocheEditado={cocheEditado}
          setCocheEditado={setCocheEditado}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionCoche
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          coche={cocheAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />


      </Container>
    </>
  );
};

export default Coches;