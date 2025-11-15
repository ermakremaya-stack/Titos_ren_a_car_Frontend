import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistrarUsuario = ({
  mostrarModal,
  setMostrarModal,
  nuevoUsuario,
  manejarCambioInput,
  agregarUsuario,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-3" controlId="cedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="Cedula"
              value={nuevoUsuario.Cedula}
              onChange={manejarCambioInput}
              placeholder="Ej: 0012304567890"
              maxLength={16}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="nombre1">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre1"
              value={nuevoUsuario.Nombre1}
              onChange={manejarCambioInput}
              placeholder="Ej: Carlos"
              maxLength={50}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="nombre2">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre2"
              value={nuevoUsuario.Nombre2}
              onChange={manejarCambioInput}
              placeholder="Ej: Alberto"
              maxLength={50}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="apellido1">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellido1"
              value={nuevoUsuario.Apellido1}
              onChange={manejarCambioInput}
              placeholder="Ej: Pérez"
              maxLength={50}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="apellido2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellido2"
              value={nuevoUsuario.Apellido2}
              onChange={manejarCambioInput}
              placeholder="Ej: Gómez"
              maxLength={50}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={nuevoUsuario.Telefono}
              onChange={manejarCambioInput}
              placeholder="Ej: 88881234"
              maxLength={8}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="Direccion"
              value={nuevoUsuario.Direccion}
              onChange={manejarCambioInput}
              placeholder="Ej: Managua, barrio San Judas"
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={nuevoUsuario.Email}
              onChange={manejarCambioInput}
              placeholder="Ej: usuario@ejemplo.com"
              maxLength={100}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="licencia">
            <Form.Label>Número de Licencia</Form.Label>
            <Form.Control
              type="text"
              name="Licencia"
              value={nuevoUsuario.Licencia}
              onChange={manejarCambioInput}
              placeholder="Ej: ABC12345"
              maxLength={8}
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="contrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="Contrasena"
              value={nuevoUsuario.Contrasena}
              onChange={manejarCambioInput}
              placeholder="Ej: ********"
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
          onClick={agregarUsuario}
          disabled={
            !nuevoUsuario.Cedula ||
            !nuevoUsuario.Nombre1 ||
            !nuevoUsuario.Apellido1 ||
            !nuevoUsuario.Telefono ||
            !nuevoUsuario.Direccion ||
            !nuevoUsuario.Licencia ||
            !nuevoUsuario.Contrasena
          }
        >
          Guardar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistrarUsuario;
