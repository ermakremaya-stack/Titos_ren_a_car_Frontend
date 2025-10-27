import { Table, Spinner } from "react-bootstrap";

const TablaEmpleados = ({ empleados, cargando }) => {

  if (cargando) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  };

  return (
      <>
          <Table striped bordered hover>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Rol</th>
                      <th>Cedula</th>
                      <th>Nombre1</th>
                      <th>Nombre2</th>
                      <th>Apellido1</th>
                      <th>Apellido2</th>
                      <th>Direccion</th>
                      <th>Email</th>
                      <th>Contrasena</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
        <tbody>
          {empleados.map((empleado) => {
            return (
              <tr key={empleado.Id_Empleado}>
                <td>{empleado.Id_Empleado}</td>
                <td>{empleado.Rol}</td>
                <td>{empleado.Cedula}</td>
                <td>{empleado.Nombre1}</td>
                <td>{empleado.Nombre2}</td>
                <td>{empleado.Apellido1}</td>
                <td>{empleado.Apellido2}</td>
                <td>{empleado.Direccion}</td>
                <td>{empleado.Email}</td>
                <td>{empleado.Contrasena}</td>
                <td>Acción</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaEmpleados;