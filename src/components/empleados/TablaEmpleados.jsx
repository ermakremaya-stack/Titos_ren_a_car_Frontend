
import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaEmpleados = ({ empleados = [], cargando }) => {
  const [orden, setOrden] = useState({ campo: "Id_Empleado", direccion: "asc" });

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

    const comparacion = String(valorA).localeCompare(String(valorB), undefined, { sensitivity: "base" });
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <BotonOrden campo="Id_Empleado" orden={orden} manejarOrden={manejarOrden}>
            ID
          </BotonOrden>

          <BotonOrden campo="Rol" orden={orden} manejarOrden={manejarOrden}>
            Rol
          </BotonOrden>

          <BotonOrden campo="Cedula" orden={orden} manejarOrden={manejarOrden}>
            Cédula
          </BotonOrden>

          <BotonOrden campo="Nombre1" orden={orden} manejarOrden={manejarOrden}>
            Primer Nombre
          </BotonOrden>

          <BotonOrden campo="Nombre2" orden={orden} manejarOrden={manejarOrden}>
            Segundo Nombre
          </BotonOrden>

          <BotonOrden campo="Apellido1" orden={orden} manejarOrden={manejarOrden}>
            Primer Apellido
          </BotonOrden>

          <BotonOrden campo="Apellido2" orden={orden} manejarOrden={manejarOrden}>
            Segundo Apellido
          </BotonOrden>

          <BotonOrden campo="Direccion" orden={orden} manejarOrden={manejarOrden}>
            Dirección
          </BotonOrden>

          <BotonOrden campo="Email" orden={orden} manejarOrden={manejarOrden}>
            Email
          </BotonOrden>

          <BotonOrden campo="Contrasena" orden={orden} manejarOrden={manejarOrden}>
            Contraseña
          </BotonOrden>

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
            <td>Acción</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaEmpleados;
