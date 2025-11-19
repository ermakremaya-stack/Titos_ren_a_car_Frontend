import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";
import "../../App.css";

const TablaCoche = ({
  coches,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual
}) => {

  // ----------------------------------------------------------------------------------------------
  // Componente de tabla de categorias que recibe las categorias y el estado de carga como props.
  const [orden, setOrden] = useState({ campo: "Id_Coche", marca: "asc", fecha_registro: 'asc', valor_dia: 'asc' });


  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      marca:
        prev.campo === campo && prev.marca === "asc" ? "desc" : "asc",
      fecha_registro:
        prev.campo === campo && prev.fecha_registro === "asc" ? "desc" : "asc",
      valor_dia:
        prev.campo === campo && prev.valor_dia === "asc" ? "desc" : "asc",
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
            <th className="text-center">Año del modelo</th>
            <th>Placa</th>
            <th className="text-center">
              Color
            </th>
            <th>
              <BotonOrden campo="fecha_registro" orden={orden} manejarOrden={manejarOrden}>
                Fecha de Registro
              </BotonOrden>
            </th>
            <th className="text-center" >
              <BotonOrden campo="valor_dia" orden={orden} manejarOrden={manejarOrden}>
                Valor por dia
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
                <td className="text-center">{coche.anio}</td>
                <td>{coche.placa}</td>
                <td>
                  <div className="vista-color">
                    <div
                      className="caja-color"
                      style={{ backgroundColor: coche.color }}
                      title={coche.color}
                    ></div>
                  </div>
                </td>
                <td>{coche.fecha_registro}</td>
                <td className="text-center">{coche.valor_dia} $</td>
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

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

    </>
  );
};

export default TablaCoche;