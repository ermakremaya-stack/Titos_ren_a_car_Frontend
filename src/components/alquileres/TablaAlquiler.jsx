import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaAlquiler = ({
    alquileres,
    cargando,
    abrirModalEdicion,
    abrirModalEliminacion,
    totalElementos,
    elementosPorPagina,
    paginaActual,
    establecerPaginaActual
}) => {

    const [orden, setOrden] = useState({ campo: "Id_Alquiler", fecha_inicio: "asc", fecha_fin: 'asc' });


    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            fecha_inicio:
                prev.campo === campo && prev.fecha_inicio === "asc" ? "desc" : "asc",
            fecha_fin:
                prev.campo === campo && prev.fecha_fin === "asc" ? "desc" : "asc",
        }));
    };


    const alquileresOrdenados = [...alquileres].sort((a, b) => {
        const valorA = a[orden.campo];
        const valorB = b[orden.campo];

        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.fecha_inicio === "asc" ? valorA - valorB : valorB - valorA;
        }

        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.fecha_fin === "asc" ? comparacion : -comparacion;
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
                            <BotonOrden campo="id_alquiler" orden={orden} manejarOrden={manejarOrden}>
                                ID
                            </BotonOrden>
                        </th>
                        <th>
                            <BotonOrden campo="fecha_inicio" orden={orden} manejarOrden={manejarOrden}>
                                Fecha de Inicio
                            </BotonOrden>
                        </th>
                        
                        <th>
                            <BotonOrden campo="fecha_fin" orden={orden} manejarOrden={manejarOrden}>
                                Fecha de Fin
                            </BotonOrden>
                        </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alquileresOrdenados.map((alquiler) => {
                        return (
                            <tr key={alquiler.id_alquiler}>
                                <td>{alquiler.id_alquiler}</td>
                                <td>{alquiler.fecha_inicio}</td>
                                <td>{alquiler.fecha_fin}</td>
                                <td>
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => abrirModalEdicion(alquiler)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => abrirModalEliminacion(alquiler)}
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

export default TablaAlquiler;