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
            <Form.Label>Nombre del Coche</Form.Label>
            <Form.Control
              type="text"
              name="Marca"
              value={nuevoCoche.Marca}
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
              name="Modelo"
              value={nuevoCoche.Modelo}
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
              value={nuevoCoche.Anio}
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
              name="Placa"
              value={nuevoCoche.Placa}
              onChange={manejarCambioInput}
              placeholder="Ej: 1225-5642"
              required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="color">
            <Form.Label>Color del coche</Form.Label>
            <Form.Control
              type="text"
              name="Color"
              value={nuevoCoche.Color}
              onChange={manejarCambioInput}
              placeholder="Ej: Rojo"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fecharegistro">
            <Form.Label>Fecha registro del coche</Form.Label>
            <Form.Control
              type="date"
              name="Fecha_Registro"
              value={nuevoCoche.Fecha_Registro}
              onChange={manejarCambioInput}
              placeholder="Ej: 10/09/2025"
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
          disabled={!nuevoCoche.Placa.trim()}
        >
          Guardar Coche
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCoche;
