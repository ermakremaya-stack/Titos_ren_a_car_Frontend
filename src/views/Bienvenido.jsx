// src/views/Bienvenida.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert, Modal } from "react-bootstrap";
import { User, LogOut } from "lucide-react";
import Encabezado from "../components/navegation/Encabezado.jsx";

export default function Bienvenido() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const navigate = useNavigate();


  useEffect(() => {

    const cargarUsuario = () => {
      try {
        const usuarioGuardado = localStorage.getItem("usuarioTito");
        if (usuarioGuardado) {
          const parsed = JSON.parse(usuarioGuardado);
          setUsuario(parsed);
        } else {
          setError("No se encontró usuario. Por favor inicia sesión.");
          setTimeout(() => navigate("/inicio"), 2000);
        }
      } catch (err) {
        setError("Error al cargar la información del usuario.");
        setTimeout(() => navigate("/inicio"), 2000);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioTito");
    navigate("/inicio");
  };
  

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) {
    return (
      <>
        <Encabezado />
        <Container className="mt-5 pt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <Spinner animation="border" variant="primary" style={{ color: "#8B4513" }} />
        </Container>
      </>
    );
  }

  if (error && !usuario) {
    return (
      <>
        <Encabezado />
        <Container className="mt-5 pt-5">
          <Alert variant="warning" className="text-center">
            {error}
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Encabezado />

      <Container className="mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5 text-center">

                {/* Avatar con inicial */}
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#8B4513",
                    color: "white",
                    fontSize: "2.5rem",
                    fontWeight: "bold"
                  }}
                >
                  {usuario?.nombre?.charAt(0).toUpperCase() || "U"}
                </div>

                <h1 className="mb-3 fw-bold" style={{ color: "#8B4513" }}>
                  ¡Bienvenido, {usuario?.nombre || "Usuario"}                
                </h1>

                <p className="text-muted mb-4 d-flex align-items-center justify-content-center gap-2">
                  <User size={18} />
                    Rol: <strong className="ms-1 text-capitalize">{usuario?.rol || "Administrador"}</strong>
                </p>

                  <pre style={{ fontSize: "0.8rem", color: "#555" }}>
                  </pre>
                <hr className="my-4" />

                <div className="d-grid">
                  <Button
                    onClick={openModal}
                    variant="outline-danger"
                    size="lg"
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <LogOut size={18} />
                    Cerrar Sesión
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            <LogOut className="me-2" size={20} />
            Confirmar cierre de sesión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            ¿Estás seguro de que deseas <strong>cerrar sesión</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleLogout();
              closeModal();
            }}
          >
            Sí, cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}