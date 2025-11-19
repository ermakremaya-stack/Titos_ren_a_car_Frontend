import { useState } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";

const ModalRegistroMantenimiento = ({
  mostrar, setMostrar,
  nuevoMantenimiento, setNuevoMantenimiento,
  detalles = [], setDetalles,
  empleados, coches,
  agregarMantenimiento
}) => {

  const [empleadoSel, setEmpleadoSel] = useState(null);
  const [cocheSel, setCocheSel] = useState(null);

  // NUEVOS: texto real que escribe el usuario
  const [empleadoTexto, setEmpleadoTexto] = useState("");
  const [cocheTexto, setCocheTexto] = useState("");

  const [nuevoDetalle, setNuevoDetalle] = useState({
    id_empleado: "",
    id_coche: "",
    observaciones: "",
    recomendaciones: "",
    partes_cambiadas: ""
  });

  const manejarEmpleado = (sel) => {
    setEmpleadoSel(sel);
    setEmpleadoTexto(sel?.label || ""); // <-- actualiza el input correctamente
    setNuevoDetalle(prev => ({ ...prev, id_empleado: sel ? sel.value : "" }));
  };

  const manejarCoche = (sel) => {
    setCocheSel(sel);
    setCocheTexto(sel?.label || ""); // <-- actualiza el input correctamente
    setNuevoDetalle(prev => ({ ...prev, id_coche: sel ? sel.value : "" }));
  };

  const agregarDetalle = () => {
    if (!nuevoDetalle.id_empleado || !nuevoDetalle.id_coche) {
      alert("Selecciona empleado y coche.");
      return;
    }

    setDetalles(prev => [
      ...prev,
      {
        id_empleado: parseInt(nuevoDetalle.id_empleado),
        nombre_empleado: empleados.find(e => e.Id_Empleado === parseInt(nuevoDetalle.id_empleado))?.Nombre1,
        id_coche: parseInt(nuevoDetalle.id_coche),
        placa: coches.find(c => c.Id_Coche === parseInt(nuevoDetalle.id_coche))?.Placa,
        observaciones: nuevoDetalle.observaciones,
        recomendaciones: nuevoDetalle.recomendaciones,
        partes_cambiadas: nuevoDetalle.partes_cambiadas
      }
    ]);

    setNuevoDetalle({
      id_empleado: "",
      id_coche: "",
      observaciones: "",
      recomendaciones: "",
      partes_cambiadas: ""
    });

    setEmpleadoSel(null);
    setCocheSel(null);
    setEmpleadoTexto("");
    setCocheTexto("");
  };

  return (
    <Modal show={mostrar} onHide={setMostrar} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Mantenimiento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* CAMPOS MANTENIMIENTO */}
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={nuevoMantenimiento.Descripcion}
                  onChange={e =>
                    setNuevoMantenimiento(prev => ({
                      ...prev,
                      Descripcion: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Justificación</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={nuevoMantenimiento.Justificacion}
                  onChange={e =>
                    setNuevoMantenimiento(prev => ({
                      ...prev,
                      Justificacion: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={nuevoMantenimiento.Fecha_Inicio}
                  onChange={e =>
                    setNuevoMantenimiento(prev => ({
                      ...prev,
                      Fecha_Inicio: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Fecha Fin</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={nuevoMantenimiento.Fecha_Fin}
                  onChange={e =>
                    setNuevoMantenimiento(prev => ({
                      ...prev,
                      Fecha_Fin: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Costo</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={nuevoMantenimiento.Costo}
                  onChange={e =>
                    setNuevoMantenimiento(prev => ({
                      ...prev,
                      Costo: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h5>Agregar Detalle</h5>

          {/* SELECTS SIN DATALIST */}
          <Row>
            {/* EMPLEADO */}
            <Col md={4}>
              <Form.Label>Empleado</Form.Label>

              <Form.Control
                type="text"
                placeholder="Buscar empleado..."
                value={empleadoTexto}
                onChange={(e) => {
                  const texto = e.target.value;
                  setEmpleadoTexto(texto);

                  const emp = empleados.find(x =>
                    x.Nombre1.toLowerCase().includes(texto.toLowerCase())
                  );

                  if (emp) {
                    manejarEmpleado({
                      value: emp.Id_Empleado,
                      label: emp.Nombre1
                    });
                  } else {
                    setEmpleadoSel(null);
                    setNuevoDetalle(prev => ({ ...prev, id_empleado: "" }));
                  }
                }}
              />
            </Col>

            {/* COCHE */}
            <Col md={4}>
              <Form.Label>Coche</Form.Label>

              <Form.Control
                type="text"
                placeholder="Buscar coche..."
                value={cocheTexto}
                onChange={(e) => {
                  const texto = e.target.value;
                  setCocheTexto(texto);

                  const car = coches.find(x =>
                    x.Placa.toLowerCase().includes(texto.toLowerCase())
                  );

                  if (car) {
                    manejarCoche({
                      value: car.Id_Coche,
                      label: car.Placa
                    });
                  } else {
                    setCocheSel(null);
                    setNuevoDetalle(prev => ({ ...prev, id_coche: "" }));
                  }
                }}
              />
            </Col>

            <Col md={4}>
              <Button
                className="mt-4"
                variant="success"
                style={{ width: "100%" }}
                onClick={agregarDetalle}
              >
                Agregar Detalle
              </Button>
            </Col>
          </Row>

          {/* CAMPOS DEL DETALLE */}
          <Row className="mt-2">
            <Col md={4}>
              <FormControl
                as="textarea"
                rows={2}
                placeholder="Observaciones"
                value={nuevoDetalle.observaciones}
                onChange={e =>
                  setNuevoDetalle(prev => ({
                    ...prev,
                    observaciones: e.target.value
                  }))
                }
              />
            </Col>

            <Col md={4}>
              <FormControl
                as="textarea"
                rows={2}
                placeholder="Recomendaciones"
                value={nuevoDetalle.recomendaciones}
                onChange={e =>
                  setNuevoDetalle(prev => ({
                    ...prev,
                    recomendaciones: e.target.value
                  }))
                }
              />
            </Col>

            <Col md={4}>
              <FormControl
                as="textarea"
                rows={2}
                placeholder="Partes cambiadas"
                value={nuevoDetalle.partes_cambiadas}
                onChange={e =>
                  setNuevoDetalle(prev => ({
                    ...prev,
                    partes_cambiadas: e.target.value
                  }))
                }
              />
            </Col>
          </Row>

          {/* TABLA */}
          {detalles.length > 0 && (
            <Table striped bordered className="mt-3">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Coche</th>
                  <th>Observaciones</th>
                  <th>Recomendaciones</th>
                  <th>Partes cambiadas</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td>{d.nombre_empleado}</td>
                    <td>{d.placa}</td>
                    <td>{d.observaciones}</td>
                    <td>{d.recomendaciones}</td>
                    <td>{d.partes_cambiadas}</td>

                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          setDetalles(prev => prev.filter((_, idx) => idx !== i))
                        }
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={setMostrar}>Cancelar</Button>

        <Button variant="primary" onClick={agregarMantenimiento}>
          Guardar Mantenimiento
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroMantenimiento;
