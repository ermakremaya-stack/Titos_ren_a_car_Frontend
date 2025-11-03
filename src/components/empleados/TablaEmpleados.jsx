import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaEmpleados = ({ empleados, cargando }) => {

// ----------------------------------------------------------------------------------------------
  // Componente de tabla de empleados que recibe los empleados y el estado de carga como props.
  const [orden, setOrden] = useState({ campo: "Id_Empleado", Rol: "asc", Nombre1: 'asc' });


  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      Rol:
        prev.campo === campo && prev.Rol === "asc" ? "desc" : "asc",
      Nombre1:
        prev.campo === campo && prev.Nombre1 === "asc" ? "desc" : "asc",
    }));
  };


  const empleadosOrdenados = [...(empleados || [])].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.Rol === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.Rol === "asc" ? comparacion : -comparacion;
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosOrdenados.map((empleado) => {
            return (
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
                <td>Acción</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaEmpleados;