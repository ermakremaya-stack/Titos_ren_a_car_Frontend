import { Modal, Table, Button } from "react-bootstrap";

const ModalDetallesMantenimiento = ({
  mostrarModal,
  setMostrarModal,
  detalles,
}) => {
  // Aseguramos que detalles sea un array válido
  const detallesSeguros = Array.isArray(detalles) ? detalles : [];

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Mantenimiento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {detallesSeguros.length === 0 ? (
          <p className="text-muted text-center">No hay detalles para este mantenimiento.</p>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead className="table-light">
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th>Descripción</th>
                <th style={{ width: "130px" }}>Costo Unit.</th>
                <th style={{ width: "100px" }}>Cantidad</th>
                <th style={{ width: "130px" }}>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {detallesSeguros.map((d, index) => {
                const costo = parseFloat(d.Costo ?? 0);
                const cantidad = parseInt(d.Cantidad ?? 1);
                const subtotal = costo * cantidad;

                return (
                  <tr key={d.Id_Detalle_Mantenimiento || index}>
                    <td>{index + 1}</td>
                    <td>{d.Descripcion || "Sin descripción"}</td>
                    <td className="text-end">C$ {costo.toFixed(2)}</td>
                    <td className="text-center fw-bold text-primary">{cantidad}</td>
                    <td className="text-end fw-bold text-success">
                      C$ {subtotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallesMantenimiento;
