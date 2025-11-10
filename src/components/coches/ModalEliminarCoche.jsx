import { Modal, Button } from "react-bootstrap";

const ModalEliminacionCoche = ({
  mostrar,
  setMostrar,
  coche,
  confirmarEliminacion,
}) => {
     if (!coche) return null; // si no hay coche seleccionado, no mostrar nada

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar el siguiente coche?
        </p>


        <p>
          <strong>ID:</strong> {coche.id_coche} <br />
          <strong>Marca:</strong> {coche.marca} <br />
          <strong>Modelo:</strong> {coche.modelo} <br />
          <strong>Año:</strong> {coche.anio} <br />
        </p>

        <p className="text-muted small">
          Esta acción no se puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCoche;
