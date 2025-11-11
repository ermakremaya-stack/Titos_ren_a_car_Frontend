//Componentes necesarios para funcionamiento del formulario
import { Container, Card, Form, Button } from "react-bootstrap"; 
import Encabezado from "../components/navegation/Encabezado"; 


export default function Inicio() {
  return (
    <>
      <Encabezado />
      {/*Centra espacios debajo de navbar para temas de ubicacion*/}
      <Container className="mt-5 pt-5">
        {/* Se sentra el contenido dentro de esta etiqueta*/}
        <div className="row justify-content-center">
          {/*Definimoso reglas para que cuando el tamaño de la pantalla cambie sea mas dinamica y sean mas pequeños*/}
          <div className="col-md-6 col-lg-4">
            {/*Formato de diceño más elegante con borde y sombras*/}
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#8B4513" }}>
                  Tito's Rent a Car
                </h2>
                <p className="text-center text-muted mb-4">
                  Inicia sesión para continuar
                </p>

                <Form>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tuemail@ejemplo.com"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    className="w-100" 
                    style={{ backgroundColor: "#8B4513", border: "none" }}
                  >
                    Iniciar Sesión
                  </Button>
                </Form>

                {/*Creamos boton para recuperación de contraseñas en caso de olvido*/}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    ¿Olvidaste tu contraseña? <a href="#">Recupérala aquí</a>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}