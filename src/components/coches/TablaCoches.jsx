import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import  PropTypes  from "prop-types";



const TablaCoche = ({ coches, cargando }) => {

// ----------------------------------------------------------------------------------------------
  // Componente de tabla de categorias que recibe las categorias y el estado de carga como props.
  const [orden, setOrden] = useState({ campo: "Id_Coche", Marca: "asc", Fecha_Registro: 'asc' });


  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      Marca:
        prev.campo === campo && prev.Marca === "asc" ? "desc" : "asc",
      Fecha_Registro:
        prev.campo === campo && prev.Fecha_Registro === "asc" ? "desc" : "asc",
    }));
  };


  const cochesOrdenados = [...coches].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.Marca === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.Marca === "asc" ? comparacion : -comparacion;
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
              <BotonOrden campo="Id_Coche" orden={orden} manejarOrden={manejarOrden}>
                ID
              </BotonOrden>
            </th>
            <th>
              <BotonOrden campo="Marca" orden={orden} manejarOrden={manejarOrden}>
                Marca
              </BotonOrden>
            </th>
            <th>Modelo</th>
            <th>Anio</th>
            <th>Placa</th>
            <th>Color</th>
            <th>
              <BotonOrden campo="Fecha_Registro" orden={orden} manejarOrden={manejarOrden}>
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
              <tr key={coche.Id_Coche}>
                <td>{coche.Id_Coche}</td>
                <td>{coche.Marca}</td>
                <td>{coche.Modelo}</td>
                <td>{coche.Anio}</td>
                <td>{coche.Placa}</td>
                <td>{coche.Color}</td>
                <td>{coche.Fecha_Registro}</td>
                <td>{coche.Estado}</td>
                <td>Acción</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaCoche;