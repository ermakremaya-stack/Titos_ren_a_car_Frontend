import { Table, Spinner } from "react-bootstrap";

const TablaCoche = ({ coches, cargando }) => {

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
            <th>Marca</th>
            <th>Modelo</th>
            <th>Anio</th>
            <th>Placa</th>
            <th>Color</th>
            <th>Fecha de registro</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {coches.map((coche) => {
            return (
              <tr key={coche.Id_Coche}>
                <td>{coche.Id_Coche}</td>
                <td>{coche.Marca}</td>
                <td>{coche.Modelo}</td>
                <td>{coche.Anio}</td>
                <td>{coche.Placa}</td>
                <td>{coche.Color}</td>
                <td>{coche.Fecha_Registro}</td>
                <td>{coche.Estado}</td>
                <td>Acción</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaCoche;