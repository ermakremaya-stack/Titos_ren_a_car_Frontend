import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleados = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
}) => {
  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="Rol">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              type="text"
              name="Rol"
              value={nuevoEmpleado.Rol}
              onChange={manejarCambioInput}
              placeholder="Ej: Mecánico"
              maxLength={30}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Cedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="Cedula"
              value={nuevoEmpleado.Cedula}
              onChange={manejarCambioInput}
              placeholder="Ej: 0012345678"
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Nombre1">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre1"
              value={nuevoEmpleado.Nombre1}
              onChange={manejarCambioInput}
              placeholder="Ej: Luis"
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Nombre2">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre2"
              value={nuevoEmpleado.Nombre2}
              onChange={manejarCambioInput}
              placeholder="Ej: Alberto"
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Apellido1">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellido1"
              value={nuevoEmpleado.Apellido1}
              onChange={manejarCambioInput}
              placeholder="Ej: Pérez"
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Apellido2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellido2"
              value={nuevoEmpleado.Apellido2}
              onChange={manejarCambioInput}
              placeholder="Ej: Gómez"
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="Direccion"
              value={nuevoEmpleado.Direccion}
              onChange={manejarCambioInput}
              placeholder="Ej: Santo Tomás, San José"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={nuevoEmpleado.Email}
              onChange={manejarCambioInput}
              placeholder="Ej: empleado@ejemplo.com"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Contrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="Contrasena"
              value={nuevoEmpleado.Contrasena}
              onChange={manejarCambioInput}
              placeholder="Ej: ********"
              maxLength={50}
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
          onClick={agregarEmpleado}
          disabled={!nuevoEmpleado.Cedula.trim()}
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleados;