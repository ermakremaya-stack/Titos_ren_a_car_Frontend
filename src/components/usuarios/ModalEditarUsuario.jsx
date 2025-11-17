// src/components/usuarios/ModalEditarUsuario.jsx
import { Modal, Form, Button } from "react-bootstrap";

const ModalEditarUsuario = ({
  mostrarModalEditar,
  setMostrarModalEditar,
  usuarioEditado,
  manejarCambioInputEditar,
  guardarCambiosUsuario,
}) => {
  return (
    <Modal show={mostrarModalEditar} onHide={() => setMostrarModalEditar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="cedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="Cedula"
              value={usuarioEditado.Cedula || ""}
              onChange={manejarCambioInputEditar}
              placeholder="Ej: 0012304567890"
              maxLength={16}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nombre1">
            <Form.Label>Primer Nombre *</Form.Label>
            <Form.Control
              type="text"
              name="Nombre1"
              value={usuarioEditado.Nombre1 || ""}
              onChange={manejarCambioInputEditar}
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nombre2">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre2"
              value={usuarioEditado.Nombre2 || ""}
              onChange={manejarCambioInputEditar}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="apellido1">
            <Form.Label>Primer Apellido *</Form.Label>
            <Form.Control
              type="text"
              name="Apellido1"
              value={usuarioEditado.Apellido1 || ""}
              onChange={manejarCambioInputEditar}
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="apellido2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellido2"
              value={usuarioEditado.Apellido2 || ""}
              onChange={manejarCambioInputEditar}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Teléfono *</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={usuarioEditado.Telefono || ""}
              onChange={manejarCambioInputEditar}
              maxLength={8}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección *</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="Direccion"
              value={usuarioEditado.Direccion || ""}
              onChange={manejarCambioInputEditar}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={usuarioEditado.Email || ""}
              onChange={manejarCambioInputEditar}
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="licencia">
            <Form.Label>Número de Licencia *</Form.Label>
            <Form.Control
              type="text"
              name="Licencia"
              value={usuarioEditado.Licencia || ""}
              onChange={manejarCambioInputEditar}
              maxLength={8}
              required
            />
          </Form.Group>

          {/* Contraseña: opcional al editar */}
          <Form.Group className="mb-3" controlId="contrasena">
            <Form.Label>Nueva Contraseña (dejar vacío si no desea cambiar)</Form.Label>
            <Form.Control
              type="password"
              name="Contrasena"
            
              onChange={manejarCambioInputEditar}
              placeholder="Solo si desea cambiarla"
              maxLength={20}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEditar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarCambiosUsuario}
          disabled={
            !usuarioEditado.Nombre1 ||
            !usuarioEditado.Apellido1 ||
            !usuarioEditado.Telefono ||
            !usuarioEditado.Direccion ||
            !usuarioEditado.Licencia
          }
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarUsuario;