import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";


export default function Inicio() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");  // ← NUEVO

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!Email || !Contrasena) {
      setMensaje("Faltan correo o contraseña");
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
      }
    } catch (error) {
      setMensaje("Error de conexión");
    }
  };

  return (
    <>
      <Container className="mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#8B4513" }}>
                  Tito's Rent a Car
                </h2>

                {/* MENSAJE DE ERROR */}
                {mensaje && <div className="alert alert-danger">{mensaje}</div>}

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
                      placeholder="juan123"
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
    </>
  );
}