// src/views/Inicio.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export default function Inicio() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("cliente");

const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMostrarRecuperar(false);

    if (!Email || !Contrasena) {
      setMensaje("Faltan correo o contraseña");
      return;
    }

    // ENDPOINT SEGÚN TIPO
    const endpoint = tipoUsuario === "cliente"
      ? "http://localhost:3000/api/loginusuario"
      : "http://localhost:3000/api/loginempleado";

    try {
      const res = await fetch(endpoint, {
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
                    placeholder="Tú correo"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={mostrarContrasena ? "text" : "password"}
                      value={Contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      placeholder="Tú contraseña"
                    />
                    <InputGroup.Text
                      onClick={() => setMostrarContrasena(!mostrarContrasena)}
                      style={{ cursor: "pointer", background: "transparent", borderLeft: "none" }}
                    >
                      {mostrarContrasena ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tipo de usuario</Form.Label>
                  <Form.Select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
                    <option value="cliente">Cliente</option>
                    <option value="empleado">Empleado</option>
                  </Form.Select>
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