import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const TablaMantenimientos = ({
  mantenimientos,
  abrirModalEdicion,
  abrirModalEliminacion,
  obtenerDetalles
}) => {
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Justificación</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {mantenimientos.map((m) => (
            <tr key={m.Id_Mantenimiento}>
              <td>{m.Id_Mantenimiento}</td>
              <td>{m.Descripcion}</td>
              <td>{m.Justificacion}</td>
              <td>{m.Fecha_Inicio}</td>
              <td>{m.Fecha_Fin}</td>
              <td>{m.Costo}</td> {/* CORREGIDO */}

              <td>
                <Button
                  size="sm"
                  variant="info"
                  className="me-2"
                  onClick={() => abrirModalEdicion(m)}
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="me-2"
                  onClick={() => abrirModalEliminacion(m)}
                >
                  Eliminar
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => obtenerDetalles(m.Id_Mantenimiento)}
                >
                  Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaMantenimientos;
