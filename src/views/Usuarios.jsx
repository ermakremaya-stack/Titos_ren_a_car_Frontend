import { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios.jsx";
import ModalRegistroUsuario from "../components/usuarios/ModalRegistrarUsuario.jsx";
import CuadroBusqueda from "../components/busquedas/CuadroBusqueda.jsx";


const Usuarios = () => {

const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

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

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/usuarios");
      if (!respuesta.ok) {
        throw  Error("Error al obtener los Usuarios");
      }

      const datos = await respuesta.json();
      console.log("Usuarios API raw:", datos);

      // Aceptar varias formas de respuesta: array directo o objeto con la lista en alguna clave
      let lista = [];
      if (Array.isArray(datos)) lista = datos;
      else if (Array.isArray(datos.usuarios)) lista = datos.usuarios;
      else if (Array.isArray(datos.data)) lista = datos.data;
      else if (Array.isArray(datos.results)) lista = datos.results;
      else {
        // último recurso: si el objeto tiene sólo claves que parecen usuarios, intentar extraer valores
        const posibles = Object.values(datos).filter((v) => Array.isArray(v));
        lista = posibles[0] || [];
      }

      setUsuarios(lista);
      setUsuariosFiltrados(lista);
      setCargando(false);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setCargando(false);
    }

  };

        const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);
    const filtrados = usuarios.filter((usuario) =>
      (usuario.Nombre1 || "").toLowerCase().includes(texto) ||
      (usuario.Nombre2 || "").toLowerCase().includes(texto) ||
      (usuario.Apellido1 || "").toLowerCase().includes(texto) ||
      (usuario.Apellido2 || "").toLowerCase().includes(texto) ||
      (usuario.Telefono || "").toLowerCase().includes(texto) ||
      (usuario.Direccion || "").toLowerCase().includes(texto) ||
      (usuario.Licencia || "").toLowerCase().includes(texto) ||
      (usuario.Email || "").toLowerCase().includes(texto)
    );
        setUsuariosFiltrados(filtrados);
    };

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
      // refrescar lista tras crear usuario
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("No se pudo registrar el usuario.");
    }
  };

  return (
    <>
    <Container className="mt-4">
      <h4>Usuarios</h4>
      {/* Debug: mostrar número de usuarios y un preview del primero para facilitar diagnóstico */}
      {!cargando && (
        <div className="mt-2 mb-2">
          <strong>Debug:</strong> {usuariosFiltrados.length} usuarios cargados
          {usuariosFiltrados.length > 0 && (
            <pre style={{ maxHeight: 200, overflow: "auto", background: "#f8f9fa", padding: 8 }}>
              {JSON.stringify(usuariosFiltrados[0], null, 2)}
            </pre>
          )}
        </div>
      )}
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

        <ModalRegistroUsuario
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
