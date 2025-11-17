import { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios.jsx";
import ModalRegistrarUsuario from "../components/usuarios/ModalRegistrarUsuario.jsx";
import ModalEditarUsuario from "../components/usuarios/ModalEditarUsuario.jsx";
import ModalEliminarUsuario from "../components/usuarios/ModalEliminarUsuario.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";


const Usuarios = () => {

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
  
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

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({});

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  const usuariosPaginados = usuariosFiltrados.slice(
  (paginaActual - 1) * elementosPorPagina,
  paginaActual * elementosPorPagina
);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarCambioInputEditar = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({ ...prev, [name]: value }));
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
        throw Error("Error al obtener los Usuarios");
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

  const abreModalEditar = (usuario) => {
    setUsuarioEditado(usuario);
    setMostrarModalEditar(true);
  };

  const guardarCambiosUsuario = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/usuarios/${usuarioEditado.Id_Usuario}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEditado),
      });

      if (!respuesta.ok) throw new Error("Error al actualizar el usuario");
      setMostrarModalEditar(false);
      await obtenerUsuario();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("No se pudo actualizar el usuario.");
    }
  };

  const abrirModalEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    if (!usuarioAEliminar) return;

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/usuarios/${usuarioAEliminar.Id_Usuario}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar");

      setMostrarModalEliminar(false);
      setUsuarioAEliminar(null);
      await obtenerUsuario(); // refrescar lista
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el usuario");
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = usuarios.filter((usuario) =>

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
            <Button
              className="color-boton"
              onClick={() => setMostrarModal(true)}
            >
              + Nuevo usuario
            </Button>
          </Col>
        </Row>

        <TablaUsuarios
          usuarios={usuariosPaginados}
          cargando={cargando}
          abrirModalEditar={abreModalEditar}
          abrirModalEliminar={abrirModalEliminar}
          totalElementos={usuarios.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />

        <ModalRegistrarUsuario
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoUsuario={nuevoUsuario}
          manejarCambioInput={manejarCambioInput}
          agregarUsuario={agregarUsuario}
        />

        <ModalEditarUsuario
          mostrarModalEditar={mostrarModalEditar}
          setMostrarModalEditar={setMostrarModalEditar}
          usuarioEditado={usuarioEditado}
          manejarCambioInputEditar={manejarCambioInputEditar}
          guardarCambiosUsuario={guardarCambiosUsuario}
        />

        <ModalEliminarUsuario
          mostrarModalEliminar={mostrarModalEliminar}
          setMostrarModalEliminar={setMostrarModalEliminar}
          usuarioAEliminar={usuarioAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />
      </Container>
    </>
  );
};

export default Usuarios;
