import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmpleados.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";
import ModalRegistroEmpleados from "../components/empleados/ModelRegistrarEmpleados.jsx";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Rol: "",
    Cedula: "",
    Nombre1: "",
    Nombre2: "",
    Apellido1: "",
    Apellido2: "",
    Direccion: "",
    Email: "",
    Contrasena: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  const agregarEmpleado = async () => {
    // validación mínima
    if (
      !String(nuevoEmpleado.Rol ?? "").trim() ||
      !String(nuevoEmpleado.Cedula ?? "").trim() ||
      !String(nuevoEmpleado.Nombre1 ?? "").trim() ||
      !String(nuevoEmpleado.Apellido1 ?? "").trim() ||
      !String(nuevoEmpleado.Direccion ?? "").trim() ||
      !String(nuevoEmpleado.Contrasena ?? "").trim()
    ) {
      alert("Por favor complete los campos obligatorios.");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarempleado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) throw new Error("Error al guardar");

      setNuevoEmpleado({
        Rol: "",
        Cedula: "",
        Nombre1: "",
        Nombre2: "",
        Apellido1: "",
        Apellido2: "",
        Direccion: "",
        Email: "",
        Contrasena: "",
      });

      setMostrarModal(false);
      await obtenerEmpleados();
    } catch (error) {
      console.error("Error al agregar Empleado:", error);
      alert("No se pudo guardar el empleado. Revisa la consola.");
    }
  };

  const obtenerEmpleados = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch("http://localhost:3000/api/Empleados");
      if (!respuesta.ok) throw new Error("Error al obtener los Empleados");
      const datos = await respuesta.json();
      setEmpleados(datos || []);
      setEmpleadosFiltrados(datos || []);
    } catch (error) {
      console.error(error.message);
      setEmpleados([]);
      setEmpleadosFiltrados([]);
    } finally {
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = String(e.target?.value ?? "").toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = (empleados || []).filter((empleado) => {
      const rol = String(empleado?.Rol ?? "").toLowerCase();
      const cedula = String(empleado?.Cedula ?? "").toLowerCase();
      const nombre1 = String(empleado?.Nombre1 ?? "").toLowerCase();
      const nombre2 = String(empleado?.Nombre2 ?? "").toLowerCase();
      const apellido1 = String(empleado?.Apellido1 ?? "").toLowerCase();
      const apellido2 = String(empleado?.Apellido2 ?? "").toLowerCase();
      const direccion = String(empleado?.Direccion ?? "").toLowerCase();
      const email = String(empleado?.Email ?? "").toLowerCase();
      const contrasena = String(empleado?.Contrasena ?? "").toLowerCase();

      return (
        rol.includes(texto) ||
        cedula.includes(texto) ||
        nombre1.includes(texto) ||
        nombre2.includes(texto) ||
        apellido1.includes(texto) ||
        apellido2.includes(texto) ||
        direccion.includes(texto) ||
        email.includes(texto) ||
        contrasena.includes(texto)
      );
    });

    setEmpleadosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerEmpleados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h4>Empleados</h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusqueda textoBusqueda={textoBusqueda} manejarCambioBusqueda={manejarCambioBusqueda} />
          </Col>
          <Col className="text-end">
            <Button
              variant="primary"
              className="color_boton_registrar"
              onClick={() => {
                setNuevoEmpleado({
                  Rol: "",
                  Cedula: "",
                  Nombre1: "",
                  Nombre2: "",
                  Apellido1: "",
                  Apellido2: "",
                  Direccion: "",
                  Email: "",
                  Contrasena: "",
                });
                setMostrarModal(true);
              }}
            >
              + Nuevo Empleado
            </Button>
          </Col>
        </Row>

        <TablaEmpleados empleados={empleadosFiltrados} cargando={cargando} />

        <ModalRegistroEmpleados
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
        />
      </Container>
    </>
  );
};

export default Empleados;