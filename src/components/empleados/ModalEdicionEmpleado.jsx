import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalEdicionEmpleado = ({
  mostrar,
  setMostrar,
  empleadoEditado,
  setEmpleadoEditado,
  guardarEdicion,
}) => {

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="Rol">
                <Form.Label>Rol</Form.Label>
            <Form.Select
              name="Rol"
              value={empleadoEditado?.Rol || ''}
              onChange={manejarCambio}
              required
              >
              <option value=''>Selecciona un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Mecánico">Mecánico</option>
              <option value="Agente de alquiler">Agente de alquiler</option>
            </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Cedula">
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="text"
                  name="Cedula"
                  value={empleadoEditado?.Cedula || ""}
                  onChange={manejarCambio}
                  placeholder="Ej: 0012345678"
                  maxLength={50}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Nombre1">
                <Form.Label>Primer Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="Nombre1"
                  value={empleadoEditado?.Nombre1 || ""}
                  onChange={manejarCambio}
                  placeholder="Ej: Luis"
                  maxLength={50}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Nombre2">
                <Form.Label>Segundo Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="Nombre2"
                  value={empleadoEditado?.Nombre2 || ""}
                  onChange={manejarCambio}
                  placeholder="Ej: Alberto"
                  maxLength={50}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Apellido1">
                <Form.Label>Primer Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="Apellido1"
                  value={empleadoEditado?.Apellido1 || ""}
                  onChange={manejarCambio}
                  placeholder="Ej: Pérez"
                  maxLength={50}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Apellido2">
                <Form.Label>Segundo Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="Apellido2"
                  value={empleadoEditado?.Apellido2 || ""}
                  onChange={manejarCambio}
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
                  value={empleadoEditado?.Direccion || ""}
                  onChange={manejarCambio}
                  placeholder="Ej: Santo Tomás, San José"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={empleadoEditado?.Email || ""}
                  onChange={manejarCambio}
                  placeholder="Ej: empleado@ejemplo.com"
                  maxLength={100}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Contrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="Contrasena"
                  value={empleadoEditado?.Contrasena || ""}
                  onChange={manejarCambio}
                  placeholder="Dejar en blanco para no cambiar"
                  maxLength={50}
                />
              </Form.Group>
            </Col>
          </Row>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={
            !empleadoEditado?.Nombre1?.trim() ||
            !empleadoEditado?.Apellido1?.trim() ||
            !empleadoEditado?.Fecha_Contratacion
          }
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionEmpleado;