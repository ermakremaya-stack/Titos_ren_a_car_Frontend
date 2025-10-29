import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const ModalRegistroEmpleados = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado = {},
  manejarCambioInput,
  agregarEmpleado,
}) => {
  const emp = nuevoEmpleado || {};

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Empleado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="Rol">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              type="text"
              name="Rol"
              value={emp.Rol ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: Mecanico"
              maxLength={16}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Cedula">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              type="text"
              name="Cedula"
              value={emp.Cedula ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: 0012304567600"
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Nombre1">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre1"
              value={emp.Nombre1 ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: Luis"
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Nombre2">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Nombre2"
              value={emp.Nombre2 ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: Alberto"
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="apellido1">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellido1"
              value={emp.Apellido1 ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: Pérez"
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="apellido2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="Apellido2"
              value={emp.Apellido2 ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: Gómez"
              maxLength={50}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="Direccion"
              value={emp.Direccion ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: Santo Tomas, San Jose"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={emp.Email ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: empleado@ejemplo.com"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="Contrasena"
              value={emp.Contrasena ?? ""}
              onChange={manejarCambioInput}
              placeholder="Ej: ********"
              maxLength={20}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>

        <Button
          variant="primary"
          onClick={agregarEmpleado}
          disabled={
            !emp.Rol ||
            !emp.Cedula ||
            !emp.Nombre1 ||
            !emp.Apellido1 ||
            !emp.Direccion ||
            !emp.Contrasena
          }
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleados;
