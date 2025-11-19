import { Modal, Button } from "react-bootstrap";

const ModalEliminarMantenimiento = ({ 
  mostrar, 
  setMostrar, 
  mantenimiento, 
  confirmar 
}) => {
  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        ¿Estás seguro que deseas eliminar el mantenimiento 
        <strong> #{mantenimiento?.Id_Mantenimiento}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>

        <Button variant="danger" onClick={confirmar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarMantenimiento;
