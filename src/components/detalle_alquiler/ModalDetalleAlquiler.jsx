import { Modal, Table, Button } from 'react-bootstrap';

const ModalDetalleAlquiler = ({ mostrarModal, setMostrarModal, detalles }) => {
    return (
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Alquiler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Coche</th>
                            <th>Usuario</th>
                            <th>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center">No hay detalles</td>
                            </tr>
                        ) : (
                            detalles.map((d) => (
                                <tr key={d.Id_Detalle_Alquiler}>
                                    <td>{d.nombre_coche}</td> {/* O el campo que tengas para el nombre del coche */}
                                    <td>{d.nombre_usuario}</td> {/* O el campo que tengas para el nombre del usuario */}
                                    <td>C$ {parseFloat(d.Precio_Total).toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetalleAlquiler;
