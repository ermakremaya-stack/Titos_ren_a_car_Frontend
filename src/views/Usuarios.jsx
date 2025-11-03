import { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios.jsx";
import ModalRegistrarUsuario from "../components/usuarios/ModalRegistrarUsuario.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";


const Usuarios = () => {

const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    Rol: "Usuario",
    Cedula: "",
    Nombre1: "",
    Nombre2: "",
    Apellido1: "",
    Apellido2: "",
    Telefono: "",
    Direccion: "",
    Email: "",
    Licencia: "",
    Contrasena: "",
  });

     const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };



 const agregarUsuario = async () => {
    if (!nuevoUsuario.Nombre1 ||
      !nuevoUsuario.Apellido1 ||
      !nuevoUsuario.Telefono ||
      !nuevoUsuario.Direccion ||
      !nuevoUsuario.Email) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarusuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!respuesta.ok) throw new Error("Error al registrar el usuario");
      setNuevoUsuario({
        Rol: "Usuario",
        Cedula: "",
        Nombre1: "",
        Nombre2: "",
        Apellido1: "",
        Apellido2: "",
        Telefono: "",
        Direccion: "",
        Email: "",
        Licencia: "",
        Contrasena: "",
      });
      setMostrarModal(false);
      // refrescar lista tras crear usuario
      await obtenerUsuario();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("No se pudo registrar el usuario.");
    }
  };

  const obtenerUsuario = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/usuarios");
      if (!respuesta.ok) {
        throw  Error("Error al obtener los Usuarios");
      }

      const datos = await respuesta.json();

      setUsuarios(datos);
      setUsuariosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error.menssage);
      setCargando(false);
    }

  };

        const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

    const filtrados = usuarios.filter((usuario) =>
      usuario.Rol .toLowerCase().includes(texto) ||
      usuario.Cedula.toLowerCase().includes(texto) ||
      usuario.Nombre1.toLowerCase().includes(texto) ||
      usuario.Nombre2.toLowerCase().includes(texto) ||
      usuario.Apellido1.toLowerCase().includes(texto) ||
      usuario.Apellido2.toLowerCase().includes(texto) ||
      usuario.Telefono.toLowerCase().includes(texto) ||
      usuario.Direccion.toLowerCase().includes(texto) ||
      usuario.Licencia.toLowerCase().includes(texto) ||
      usuario.Email.toLowerCase().includes(texto)
    );
        setUsuariosFiltrados(filtrados);
    };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  return (
    <>
    <Container className="mt-4">
      <h4>Usuarios</h4>
      <Row>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusqueda
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
     

      <Col className="text-end">
      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        + Nuevo Usuario
      </Button>
        </Col>
      </Row>

        <TablaUsuarios
         usuarios={usuariosFiltrados}
         cargando={cargando}
          />

        <ModalRegistrarUsuario
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoUsuario={nuevoUsuario}
          manejarCambioInput={manejarCambioInput}
          agregarUsuario={agregarUsuario}
        />
    </Container>
    </>
  );
};

export default Usuarios;
