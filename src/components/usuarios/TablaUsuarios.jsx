import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden.jsx";
import Paginacion from "../ordenamiento/Paginacion.jsx";

const TablaUsuarios = ({
  usuarios,
  cargando,
  abrirModalEditar,
  abrirModalEliminar,
  elementosPorPagina,
  totalElementos,
  paginaActual,
  establecerPaginaActual,
}) => {
  const [orden, setOrden] = useState({
    campo: "Id_Usuario",
    Id_Usuario: "asc",
    Nombre1: "asc",
    Apellido1: "asc",
    Telefono: "asc",
    Direccion: "asc",
  });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      ...prev,
      campo,
      [campo]: prev[campo] === "asc" ? "desc" : "asc",
    }));
  };

  const usuariosOrdenados = [...usuarios].sort((a, b) => {
    const campo = orden.campo;
    const direccion = orden[campo];
    const valorA = a[campo];
    const valorB = b[campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );
  }

  return (
    <>
    <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <BotonOrden campo="Id_Usuario" orden={orden} manejarOrden={manejarOrden}>
                ID
              </BotonOrden>
            </th>
            <th>Cédula</th>
            <th>
              <BotonOrden campo="Nombre1" orden={orden} manejarOrden={manejarOrden}>
                Nombre 1
              </BotonOrden>
            </th>
            <th>Nombre 2</th>
            <th>
              <BotonOrden campo="Apellido1" orden={orden} manejarOrden={manejarOrden}>
                Apellido 1
              </BotonOrden>
            </th>
            <th>Apellido 2</th>
            <th>
              <BotonOrden campo="Telefono" orden={orden} manejarOrden={manejarOrden}>
                Teléfono
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Direccion" orden={orden} manejarOrden={manejarOrden}>
                Dirección
              </BotonOrden>
            </th>
            <th>Email</th>
            <th>Licencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosOrdenados.map((usuario) => (
            <tr key={usuario.Id_Usuario}>
              <td>{usuario.Id_Usuario}</td>
              <td>{usuario.Cedula}</td>
              <td>{usuario.Nombre1}</td>
              <td>{usuario.Nombre2}</td>
              <td>{usuario.Apellido1}</td>
              <td>{usuario.Apellido2}</td>
              <td>{usuario.Telefono}</td>
              <td>{usuario.Direccion}</td>
              <td>{usuario.Email}</td>
              <td>{usuario.Licencia}</td>              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEditar(usuario)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminar(usuario)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaUsuarios;