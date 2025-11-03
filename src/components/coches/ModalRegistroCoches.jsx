import { Modal, Form, Button } from "react-bootstrap";


const ModalRegistroCoche = ({
  mostrarModal,
  setMostrarModal,
  nuevoCoche,
  manejarCambioInput,
  agregarCoche,
}) => {
  return (
    <Modal 
    backdrop="static"
      show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Coche</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form>
          <Form.Group className="mb-3" controlId="marca">
            <Form.Label>Marca del Coche</Form.Label>
            <Form.Control
              type="text"
              name="marca"
              value={nuevoCoche.marca}
              onChange={manejarCambioInput}
              placeholder="Ej: Toyota"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="modelo">
            <Form.Label>Modelo del coche</Form.Label>
            <Form.Control
              type="text"
              name="modelo"
              value={nuevoCoche.modelo}
              onChange={manejarCambioInput}
              placeholder="Modelo del coche"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="anio">
            <Form.Label>Año</Form.Label>
            <Form.Control
              type="number"
              name="anio"
              value={nuevoCoche.anio}
              onChange={manejarCambioInput}
              placeholder="Ej: 2025"
              step='1'
              min='1800'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="placa">
            <Form.Label>Placa del coche</Form.Label>
            <Form.Control
              type="text"
              name="placa"
              value={nuevoCoche.placa}
              onChange={manejarCambioInput}
              placeholder="Ej: 1225-5642"
              required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="color">
            <Form.Label>Color del coche</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={nuevoCoche.color}
              onChange={manejarCambioInput}
              placeholder="Ej: Rojo"
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
          onClick={agregarCoche}
          disabled={!nuevoCoche.placa.trim()}
        >
          Guardar Coche
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCoche;
