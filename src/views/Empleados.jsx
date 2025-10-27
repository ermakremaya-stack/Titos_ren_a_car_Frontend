import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmpleados.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";

const Empleados = () => {

  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const obtenerEmpleados = async () => {
    try{
      const respuesta = await fetch("http://localhost:3000/api/Empleados");
      if(!respuesta.ok) {
        throw new Error("Error al obtemer los Empleados");
      }

      const datos = await respuesta.json();

      setEmpleados(datos);
      setEmpleadosFiltrados(datos);
      setCargando(false);

    }catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

      const filtrados = empleados.filter(
          (empleado) =>
              empleado.Rol.toLowerCase().includes(texto) ||
              empleado.Cedula.toLowerCase().includes(texto) ||
              empleado.Nombre1.toLowerCase().includes(texto) ||
              empleado.Nombre2.toLowerCase().includes(texto) ||
              empleado.Apellido1.toLowerCase().includes(texto) ||
              empleado.Apellido2.toLowerCase().includes(texto) ||
              empleado.Direccion.toLowerCase().includes(texto) ||
              empleado.Email.toLowerCase().includes(texto) ||
              empleado.Contrasena.toLowerCase().includes(texto)
      );
    setEmpleadosFiltrados(filtrados)
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <>
      <Container className="mt-4">

        <h4>Empleados</h4>


        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusqueda
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>


        <TablaEmpleados
        empleados={empleadosFiltrados}
        cargando={cargando}
        />
      </Container>
    </>
  );
};  

export default Empleados;