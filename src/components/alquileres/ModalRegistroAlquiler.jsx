import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroAlquiler = ({
    mostrarModal,
    setMostrarModal,
    nuevoAlquiler,
    manejarCambioInput,
    agregarAlquiler,
}) => {
    return (
        <Modal
            backdrop="static"
            show={mostrarModal}
            onHide={() => setMostrarModal(false)}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Alquiler</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* FECHA DE INICIO */}
                    <Form.Group className="mb-3" controlId="fecha_inicio">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="fecha_inicio"
                            value={nuevoAlquiler.fecha_inicio}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>

                    {/* FECHA DE FIN */}
                    <Form.Group className="mb-3" controlId="fecha_fin">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="fecha_fin"
                            value={nuevoAlquiler.fecha_fin}
                            onChange={manejarCambioInput}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>

                <Button
                    variant="primary"
                    onClick={agregarAlquiler}
                    disabled={!nuevoAlquiler.fecha_inicio.trim()}
                >
                    Guardar Alquiler
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroAlquiler;
