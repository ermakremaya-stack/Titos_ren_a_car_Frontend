import { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCoche = ({
  mostrar,
  setMostrar,
  cocheEditado,
  setCocheEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCocheEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Coche</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="marca">
            <Form.Label>Marca del coche</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              value={cocheEditado?.marca}
              onChange={manejarCambio}
              placeholder="Ej: Toyota"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="modelo">
            <Form.Label>Modelo del coche</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              value={cocheEditado?.modelo}
              onChange={manejarCambio}
              placeholder="Modelo del coche"
              maxLength={50}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="anio">
            <Form.Label>Año del coche</Form.Label>
            <Form.Control
              type="text"
              name="anio"
              value={cocheEditado?.anio}
              onChange={manejarCambio}
              placeholder="El año del coche"
              maxLength={50}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="placa">
            <Form.Label>Placa del coche</Form.Label>
            <Form.Control
              type="text"
              name="placa"
              value={cocheEditado?.placa}
              onChange={manejarCambio}
              placeholder="Placa del coche"
              maxLength={50}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="color">
            <Form.Label>Color del coche</Form.Label>
            <Form.Control
              type="color"
              name="color"
              value={cocheEditado?.color}
              onChange={manejarCambio}
              placeholder="Modelo del coche"
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
          disabled={!cocheEditado?.marca?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCoche;
