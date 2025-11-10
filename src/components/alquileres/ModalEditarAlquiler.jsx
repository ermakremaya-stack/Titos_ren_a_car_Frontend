import { useEffect } from "react";
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
                            type="text"
                            name="fecha_inicio"
                            value={alquilerEditado?.fecha_inicio}
                            onChange={manejarCambio}
                            placeholder="Ej: 2024-03-01 09:00:00"
                            maxLength={50}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fecha_fin">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control
                            type="text"
                            name="fecha_fin"
                            value={alquilerEditado?.fecha_fin}
                            onChange={manejarCambio}
                            placeholder="2024-03-10 17:30:00"
                            maxLength={50}
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
