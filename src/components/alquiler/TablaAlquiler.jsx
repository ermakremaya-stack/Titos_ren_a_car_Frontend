import { Table, Spinner } from "react-bootstrap";

const TablaAlquiler = ({ alquiler, cargando }) => {

    if (cargando) {
        return (
            <>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>
        )
    }


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alquiler.map((alquiler) => {
                        return (
                            <tr key={alquiler.id_alquiler}>
                                <td>{alquiler.id_alquiler}</td>
                                <td>{alquiler.fecha_inicio}</td>
                                <td>{alquiler.fecha_fin}</td>
                                <td>Accion</td>
                            </tr>

                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default TablaAlquiler;