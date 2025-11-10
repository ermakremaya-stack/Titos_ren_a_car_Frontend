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
            show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Alquiler</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3" controlId="fecha_inicio">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control
                            type="text"
                            name="fecha_inicio"
                            value={nuevoAlquiler.fecha_inicio}
                            onChange={manejarCambioInput}
                            placeholder="Ej. 10/07/07"
                            maxLength={20}
                            required
                        />
                    </Form.Group> 

                    <Form.Group className="mb-3" controlId="fecha_fin">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control
                            type="text"
                            name="fecha_fin"
                            value={nuevoAlquiler.fecha_fin}
                            onChange={manejarCambioInput}
                            placeholder="fecha fin del alquiler"
                            maxLength={20}
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
