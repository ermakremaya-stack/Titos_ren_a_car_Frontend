import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaEmpleado = ({
  empleados,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual
}) => {
  const [orden, setOrden] = useState({ campo: "id_empleado", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const empleadosOrdenados = [...empleados].sort((a, b) => {
    const valorA = a[orden.campo] ?? "";
    const valorB = b[orden.campo] ?? "";
    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }
    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  // --------------------------------------------------------------------------------------------

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
            <th>
              <BotonOrden campo="Id_Empleado" orden={orden} manejarOrden={manejarOrden}>
                ID
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Rol" orden={orden} manejarOrden={manejarOrden}>
                Rol
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Cedula" orden={orden} manejarOrden={manejarOrden}>
                Cédula
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Nombre1" orden={orden} manejarOrden={manejarOrden}>
                Primer Nombre
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Nombre2" orden={orden} manejarOrden={manejarOrden}>
                Segundo Nombre
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Apellido1" orden={orden} manejarOrden={manejarOrden}>
                Primer Apellido
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Apellido2" orden={orden} manejarOrden={manejarOrden}>
                Segundo Apellido
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Direccion" orden={orden} manejarOrden={manejarOrden}>
                Dirección
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Email" orden={orden} manejarOrden={manejarOrden}>
                Email
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Contrasena" orden={orden} manejarOrden={manejarOrden}>
                Contraseña
              </BotonOrden>
            </th>

            <th>
              <BotonOrden campo="Fecha_Contratacion" orden={orden} manejarOrden={manejarOrden}>
                Fecha de Contratacion
              </BotonOrden>
            </th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosOrdenados.map((empleado) => (
            <tr key={empleado.Id_Empleado}>
              <td>{empleado.Id_Empleado}</td>
              <td>{empleado.Rol}</td>
              <td>{empleado.Cedula}</td>
              <td>{empleado.Nombre1}</td>
              <td>{empleado.Nombre2}</td>
              <td>{empleado.Apellido1}</td>
              <td>{empleado.Apellido2}</td>
              <td>{empleado.Direccion}</td>
              <td>{empleado.Email}</td>
              <td>{empleado.Contrasena}</td>
              <td>{empleado.Fecha_Contratacion}</td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(empleado)}  // ← Aquí estaba "emp"
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(empleado)}  // ← Aquí también
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

export default TablaEmpleado;