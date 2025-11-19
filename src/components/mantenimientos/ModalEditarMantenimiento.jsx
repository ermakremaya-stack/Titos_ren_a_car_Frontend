import { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

const ModalEdicionMantenimiento = ({
  mostrar,
  setMostrar,
  mantenimiento,
  mantenimientoEnEdicion,
  setMantenimientoEnEdicion,
  detalles,
  setDetalles,
  empleados,
  coches,
  actualizarMantenimiento
}) => {
  const [empleadoSel, setEmpleadoSel] = useState(null);
  const [cocheSel, setCocheSel] = useState(null);

  const [nuevoDetalle, setNuevoDetalle] = useState({
    Observaciones: "",
    Recomendaciones: "",
    Partes_Cambiadas: ""
  });

  // === CARGAR EMPLEADO Y COCHE AL ABRIR ===
  useEffect(() => {
    if (mantenimiento && empleados.length > 0 && coches.length > 0 && mantenimientoEnEdicion) {
      const emp = empleados.find(e => e.Id_Empleado === mantenimientoEnEdicion.Id_Empleado);
      const car = coches.find(c => c.Id_Coche === mantenimientoEnEdicion.Id_Coche);

      setEmpleadoSel(emp ? {
        value: emp.Id_Empleado,
        label: `${emp.Nombre1} ${emp.Apellido1}`
      } : null);

      setCocheSel(car ? {
        value: car.Id_Coche,
        label: `${car.Marca} ${car.Modelo} (${car.Placa})`
      } : null);
    }
  }, [mantenimiento, empleados, coches, mantenimientoEnEdicion]);

  // === CARGA DE OPCIONES DE EMPLEADO / COCHE ===
  const cargarOpciones = (lista, tipo) => (input, callback) => {
    const filtrados = lista.filter(item => {
      const nombre =
        tipo === "empleado"
          ? `${item.Nombre1} ${item.Apellido1}`
          : `${item.Marca} ${item.Modelo} ${item.Placa}`;
      return nombre.toLowerCase().includes(input.toLowerCase());
    });

    callback(
      filtrados.map(item => ({
        value: tipo === "empleado" ? item.Id_Empleado : item.Id_Coche,
        label:
          tipo === "empleado"
            ? `${item.Nombre1} ${item.Apellido1}`
            : `${item.Marca} ${item.Modelo} (${item.Placa})`
      }))
    );
  };

  // === MÉTODOS ===
  const manejarEmpleado = (sel) => {
    setEmpleadoSel(sel);
    setMantenimientoEnEdicion(prev => ({
      ...prev,
      Id_Empleado: sel ? sel.value : ""
    }));
  };

  const manejarCoche = (sel) => {
    setCocheSel(sel);
    setMantenimientoEnEdicion(prev => ({
      ...prev,
      Id_Coche: sel ? sel.value : ""
    }));
  };

  const agregarDetalle = () => {
    if (!nuevoDetalle.Observaciones.trim()) {
      alert("Debes agregar al menos una observación.");
      return;
    }

    setDetalles(prev => [...prev, { ...nuevoDetalle }]);

    setNuevoDetalle({
      Observaciones: "",
      Recomendaciones: "",
      Partes_Cambiadas: ""
    });
  };

  const eliminarDetalle = (index) => {
    setDetalles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal show={mostrar} onHide={setMostrar} size="xl" fullscreen="lg-down">
      <Modal.Header closeButton>
        <Modal.Title>Editar Mantenimiento #{mantenimiento?.Id_Mantenimiento}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Empleado responsable</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarOpciones(empleados, "empleado")}
                  onChange={manejarEmpleado}
                  value={empleadoSel}
                  placeholder="Buscar empleado..."
                  isClearable
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Coche asignado</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarOpciones(coches, "coche")}
                  onChange={manejarCoche}
                  value={cocheSel}
                  placeholder="Buscar coche..."
                  isClearable
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={mantenimientoEnEdicion.Fecha_Inicio}
                  onChange={e =>
                    setMantenimientoEnEdicion(prev => ({
                      ...prev,
                      Fecha_Inicio: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha Fin</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={mantenimientoEnEdicion.Fecha_Fin}
                  onChange={e =>
                    setMantenimientoEnEdicion(prev => ({
                      ...prev,
                      Fecha_Fin: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Costo</Form.Label>
                <Form.Control
                  type="number"
                  value={mantenimientoEnEdicion.Costo}
                  onChange={e =>
                    setMantenimientoEnEdicion(prev => ({
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

          <Row>
            <Col md={4}>
              <FormControl
                placeholder="Observaciones"
                value={nuevoDetalle.Observaciones}
                onChange={e =>
                  setNuevoDetalle(prev => ({
                    ...prev,
                    Observaciones: e.target.value
                  }))
                }
              />
            </Col>

            <Col md={4}>
              <FormControl
                placeholder="Recomendaciones"
                value={nuevoDetalle.Recomendaciones}
                onChange={e =>
                  setNuevoDetalle(prev => ({
                    ...prev,
                    Recomendaciones: e.target.value
                  }))
                }
              />
            </Col>

            <Col md={4}>
              <FormControl
                placeholder="Partes cambiadas"
                value={nuevoDetalle.Partes_Cambiadas}
                onChange={e =>
                  setNuevoDetalle(prev => ({
                    ...prev,
                    Partes_Cambiadas: e.target.value
                  }))
                }
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Button variant="success" onClick={agregarDetalle} style={{ width: "100%" }}>
                Agregar
              </Button>
            </Col>
          </Row>

          {detalles.length > 0 && (
            <Table striped className="mt-3">
              <thead>
                <tr>
                  <th>Observaciones</th>
                  <th>Recomendaciones</th>
                  <th>Partes cambiadas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td>{d.Observaciones}</td>
                    <td>{d.Recomendaciones}</td>
                    <td>{d.Partes_Cambiadas}</td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => eliminarDetalle(i)}>
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
        <Button variant="secondary" onClick={setMostrar}>
          Cancelar
        </Button>

        <Button variant="primary" onClick={actualizarMantenimiento}>
          Actualizar Mantenimiento
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionMantenimiento;