// src/components/usuarios/ModalEliminarUsuario.jsx
import { Modal, Button } from "react-bootstrap";

const ModalEliminarUsuario = ({
  mostrarModalEliminar,
  setMostrarModalEliminar,
  usuarioAEliminar,
  confirmarEliminacion,
}) => {
  if (!usuarioAEliminar) return null;

  return (
    <Modal show={mostrarModalEliminar} onHide={() => setMostrarModalEliminar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          Confirmar Eliminación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás completamente seguro de que deseas <strong>eliminar</strong> al usuario?
        </p>
        <div className="bg-light p-3 rounded">
          <strong>
            {usuarioAEliminar.Nombre1} {usuarioAEliminar.Nombre2} {usuarioAEliminar.Apellido1} {usuarioAEliminar.Apellido2}
          </strong>
          <br />
          <small className="text-muted">
            Cédula: {usuarioAEliminar.Cedula} | Email: {usuarioAEliminar.Email}
          </small>
        </div>
        <p className="text-danger mt-3">
          Esta acción <strong>NO se puede deshacer</strong>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEliminar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Sí, Eliminar Permanentemente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarUsuario;