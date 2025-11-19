import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmpleado.jsx";
import CuadroBusquedas from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroEmpleado from "../components/empleados/ModelRegistrarEmpleado.jsx";
import ModalEdicionEmpleado from '../components/empleados/ModalEdicionEmpleado';
import ModalEliminacionEmpleado from '../components/empleados/ModalEliminacionEmpleado';

// LIBRERÍAS PARA EXPORTAR
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [buscar, setBuscar] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [empleadoEditado, setEmpleadoEditado] = useState(null);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);

  // PAGINACIÓN
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const totalPaginas = Math.ceil(empleadosFiltrados.length / elementosPorPagina);

  const nuevoEmpleadoBase = {
    Rol: "",
    Cedula: "",
    Nombre1: "",
    Nombre2: "",
    Apellido1: "",
    Apellido2: "",
    Direccion: "",
    Email: "",
    Contrasena: "",
  };

  const [nuevoEmpleado, setNuevoEmpleado] = useState(nuevoEmpleadoBase);

  // =================== EXPORTAR PDF ====================
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Empleados", 14, 10);

    const columnas = ["ID", "Rol", "Nombre", "Email", "Dirección"];
    const filas = empleados.map(e => [
      e.Id_Empleado,
      e.Rol,
      `${e.Nombre1} ${e.Nombre2} ${e.Apellido1} ${e.Apellido2}`,
      e.Email,
      e.Direccion,
    ]);

    autoTable(doc, { head: [columnas], body: filas, startY: 20 });
    doc.save("empleados.pdf");
  };

  // =================== EXPORTAR EXCEL ====================
  const exportarExcel = () => {
    const datos = empleados.map(e => ({
      ID: e.Id_Empleado,
      Rol: e.Rol,
      Nombre: `${e.Nombre1} ${e.Nombre2} ${e.Apellido1} ${e.Apellido2}`,
      Email: e.Email,
      Dirección: e.Direccion
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Empleados");

    XLSX.writeFile(libro, "Empleados.xlsx");
  };

  // =================== CRUD ====================
  const obtenerEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/empleados");
      const data = await res.json();
      setEmpleados(data);
      setEmpleadosFiltrados(data);
    } catch (error) {
      console.error("Error cargando empleados:", error);
    }
    setCargando(false);
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setBuscar(texto);
    establecerPaginaActual(1);

    const filtrados = empleados.filter(emp => {
      const nombreCompleto = `${emp.Nombre1} ${emp.Nombre2} ${emp.Apellido1} ${emp.Apellido2}`.toLowerCase();
      return (
        nombreCompleto.includes(texto) ||
        emp.Rol.toLowerCase().includes(texto) ||
        emp.Email.toLowerCase().includes(texto)
      );
    });

    setEmpleadosFiltrados(filtrados);
  };

  const agregarEmpleado = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/registrarEmpleado",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoEmpleado),
        }
      );

      if (!res.ok) throw new Error("Error al registrar");

      await obtenerEmpleados();
      setNuevoEmpleado(nuevoEmpleadoBase);
      setMostrarModal(false);

    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  const guardarEdicion = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/empleados/${empleadoEditado.Id_Empleado}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(empleadoEditado),
        }
      );

      await obtenerEmpleados();
      setMostrarModalEdicion(false);
    } catch (error) {
      console.error("Error editando:", error);
    }
  };

  const confirmarEliminacion = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/empleados/${empleadoAEliminar.Id_Empleado}`,
        { method: "DELETE" }
      );

      await obtenerEmpleados();
      setMostrarModalEliminar(false);
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Empleados</h4>

      {/* BARRA SUPERIOR */}
      <Row className="align-items-center mb-3">
        <Col lg={4}>
          <input
            type="text"
            value={buscar}
            placeholder="Buscar..."
            className="form-control"
            onChange={manejarCambioBusqueda}
          />
        </Col>

        <Col className="text-end">
          <Button className="me-2 color-boton-registro" size="sm" onClick={() => setMostrarModal(true)}>
            + Nuevo Empleado
          </Button>

          <Button size="sm" className="me-2" variant="success" onClick={exportarExcel}>
            Excel
          </Button>

          <Button size="sm" variant="danger" onClick={exportarPDF}>
            PDF
          </Button>
        </Col>
      </Row>

      {/* TABLA */}
      <TablaEmpleados
        empleados={empleadosPaginados}
        cargando={cargando}
        abrirModalEdicion={(e) => { setEmpleadoEditado(e); setMostrarModalEdicion(true); }}
        abrirModalEliminacion={(e) => { setEmpleadoAEliminar(e); setMostrarModalEliminar(true); }}
      />

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            {[...Array(totalPaginas)].map((_, i) => (
              <li key={i} className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => establecerPaginaActual(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MODALES */}
      <ModalRegistroEmpleado
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoEmpleado={nuevoEmpleado}
        manejarCambioInput={(e) =>
          setNuevoEmpleado({ ...nuevoEmpleado, [e.target.name]: e.target.value })
        }
        agregarEmpleado={agregarEmpleado}
      />

      <ModalEdicionEmpleado
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        empleadoEditado={empleadoEditado}
        setEmpleadoEditado={setEmpleadoEditado}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionEmpleado
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        empleado={empleadoAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Empleados;
