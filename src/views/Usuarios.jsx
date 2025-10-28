import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios.jsx";
import ModalRegistroUsuarios from "../components/usuarios/ModelRegistrarUsuarios.jsx"


const Usuarios = () => {

const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    ROL: "Usuario",
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

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/usuarios");
      if (!respuesta.ok) {
        throw new Error("Error al obtemer los Usuarios");
      }

      const datos = await respuesta.json();
      setUsuarios(datos);
      setUsuariosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setCargando(false);
    }

  };

        const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = usuarios.filter(
            (usuario) =>
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

     const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const agregarUsuario = async () => {
    if (!nuevoUsuario.Nombre1 ||
        !nuevoUsuario.Nombre2 ||
        !nuevoUsuario.Apellido1 ||
        !nuevoUsuario.Apellido2 ||
        !nuevoUsuario.Telefono ||
        !nuevoUsuario.Direccion ||
        !nuevoUsuario.Email ||
        !nuevoUsuario.Licencia) {
      alert("Por favor, complete todos los campos.");
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
        ROL: "Usuario",
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
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("No se pudo registrar el usuario.");
    }
  };

  return (
    <Container className="mt-4">
      <h4>Usuarios</h4>
      <Row>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusqueda
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <Col className="text-end">
      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        + Nuevo Usuario
      </Button>
        </Col>

        <TablaUsuarios
         usuarios={usuariosFiltrados}
         cargando={cargando}
          />

      <ModalRegistroUsuarios
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoUsuario={nuevoUsuario}
        manejarCambioInput={manejarCambioInput}
        agregarUsuario={agregarUsuario}
      />
    </Container>
  );
};

export default Usuarios;
