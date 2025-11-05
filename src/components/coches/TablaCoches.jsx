import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";


const TablaCoche = ({ coches, cargando, abrirModalEdicion, abrirModalEliminacion }) => {

  // ----------------------------------------------------------------------------------------------
  // Componente de tabla de categorias que recibe las categorias y el estado de carga como props.
  const [orden, setOrden] = useState({ campo: "Id_Coche", marca: "asc", fecha_registro: 'asc' });


  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      marca:
        prev.campo === campo && prev.marca === "asc" ? "desc" : "asc",
      fecha_registro:
        prev.campo === campo && prev.fecha_registro === "asc" ? "desc" : "asc",
    }));
  };


  const cochesOrdenados = [...coches].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.marca === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.marca === "asc" ? comparacion : -comparacion;
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
              <BotonOrden campo="id_coche" orden={orden} manejarOrden={manejarOrden}>
                ID
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="marca" orden={orden} manejarOrden={manejarOrden}>
                Marca
              </BotonOrden>
            </th>
            <th>Modelo</th>
            <th>Año del modelo</th>
            <th>Placa</th>
            <th>Color</th>
            <th>
              <BotonOrden campo="fecha_registro" orden={orden} manejarOrden={manejarOrden}>
                Fecha de Registro
              </BotonOrden>
            </th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cochesOrdenados.map((coche) => {
            return (
              <tr key={coche.id_coche}>
                <td>{coche.id_coche}</td>
                <td>{coche.marca}</td>
                <td>{coche.modelo}</td>
                <td>{coche.anio}</td>
                <td>{coche.placa}</td>
                <td>{coche.color}</td>
                <td>{coche.fecha_registro}</td>
                <td>{coche.estado}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEdicion(coche)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => abrirModalEliminacion(coche)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaCoche;