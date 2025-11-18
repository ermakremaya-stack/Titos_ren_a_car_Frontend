import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionAlquiler = ({
    mostrar,
    setMostrar,
    alquilerEditado,
    setAlquilerEditado,
    guardarEdicion,
}) => {
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setAlquilerEditado((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Alquiler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="fecha_inicio">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="fecha_inicio"
                            value={alquilerEditado?.fecha_inicio || ''}
                            onChange={manejarCambio}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fecha_fin">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="fecha_fin"
                            value={alquilerEditado?.fecha_fin || ''}
                            onChange={manejarCambio}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrar(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={guardarEdicion}
                    disabled={!alquilerEditado?.fecha_inicio?.trim()}
                >
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdicionAlquiler;
