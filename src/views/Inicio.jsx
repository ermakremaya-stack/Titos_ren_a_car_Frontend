// src/views/Inicio.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function Inicio() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMostrarRecuperar(false);

    if (!Email || !Contrasena) {
      setMensaje("Faltan datos");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/loginusuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email, Contrasena })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("usuarioTito", JSON.stringify(data.usuario));
        navigate("/bienvenido");
      } else {
        setMensaje(data.message || "Error al iniciar sesión");
        // MOSTRAR BOTÓN SI ES CONTRASEÑA INCORRECTA
        if (data.message?.includes("contraseña") || data.message?.includes("incorrect")) {
          setMostrarRecuperar(true);
        }
      }
    } catch (error) {
      setMensaje("Error de conexión");
    }
  };

  const recuperarContrasena = async () => {
    if (!Email) {
      setMensaje("Ingresa tu correo primero");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/recuperar-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email })
      });

      const data = await res.json();
      setMensaje(data.message);
      if (data.success) {
        setMostrarRecuperar(false);
      }
    } catch (error) {
      setMensaje("Error al enviar");
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 fw-bold" style={{ color: "#8B4513" }}>
                Tito's Rent a Car
              </h2>

              {mensaje && (
                <Alert variant="danger" className="d-flex justify-content-between align-items-center">
                  <span>{mensaje}</span>
                  {mostrarRecuperar && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={recuperarContrasena}
                      className="text-decoration-underline p-0"
                    >
                      Recuperar contraseña
                    </Button>
                  )}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan.perez@email.com"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={Contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="••••••••"
                  />
                </Form.Group>

                <Button type="submit" className="w-100" style={{ backgroundColor: "#8B4513", border: "none" }}>
                  Iniciar Sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}