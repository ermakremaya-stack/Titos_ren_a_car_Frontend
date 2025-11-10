import { Table, Spinner, Button} from "react-bootstrap";
import Paginacion from "../ordenamiento/Paginacion.jsx";
import React from "react";
import BotonOrden from "../ordenamiento/BotonOrden.jsx";

const TablaUsuarios = ({ usuarios,
   cargando,
    abrirModalEditar,
    abrirModalEliminar,
    elementosPorPagina,
    totalElementos,
    paginaActual,
    establecerPaginaActual
  }) => {

  if (cargando) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  };

  return (
      <>
          <Table striped bordered hover>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Rol</th>
                      <th>Cedula</th>
                      <th>Nombre1</th>
                      <th>Nombre2</th>
                      <th>Apellido1</th>
                      <th>Apellido2</th>
                      <th>Telefono</th>
                      <th>Direccion</th>
                      <th>Email</th>
                      <th>Licencia</th>
                      <th>Contrasena</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
        <tbody>
          {usuarios.map((usuario) => {
            return (
              <tr key={usuario.Id_Usuario}>
                <td>{usuario.Id_Usuario}</td>
                <td>{usuario.Rol}</td>
                <td>{usuario.Cedula}</td>
                <td>{usuario.Nombre1}</td>
                <td>{usuario.Nombre2}</td>
                <td>{usuario.Apellido1}</td>
                <td>{usuario.Apellido2}</td>
                <td>{usuario.Telefono}</td>
                <td>{usuario.Direccion}</td>
                <td>{usuario.Email}</td>
                <td>{usuario.Licencia}</td>
                <td>{usuario.Contrasena}</td>
                <td>
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
            );
          })}
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