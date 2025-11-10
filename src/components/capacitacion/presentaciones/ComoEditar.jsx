import Carousel from "react-bootstrap/Carousel";
import paso1 from "../../../assets/capacitacion/comoRegistrar/paso1.png";
import paso2 from "../../../assets/capacitacion/comoRegistrar/paso2.png";
import paso3 from "../../../assets/capacitacion/comoRegistrar/paso3.png";

function ComoRegistrar() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src={paso1}
          alt="Paso 1"
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />

        <div className="color-texto">
          <h3>Paso 1</h3>
          <p>Ingresamos a la vista del elemento que desea insertar y seleciona el botón "+ Nuevo" que se encuentra ubicado en la parte superior derecha de la tabla</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={paso2}
          alt="Paso 2"
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />

        <div className="color-texto">
          <h3>Paso 2</h3>
          <p>Rellene los campos solicitados y de click en el botón de "Guardar".</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={paso3}
          alt="Paso 3"
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />

        <div className="color-texto">
          <h3>Paso 3</h3>
          <h4>Hay 2 maneras de encontrar el registro guardado</h4>

          <div className="metodos-container">

            <div className="metodo">
              <h5>Método 1</h5>
              <p>Seleccionar la ultima pagina en la lista de paginas debajo de la tabla.</p>
            </div>

            <div className="metodo">
              <h5>Método 2</h5>
              <p>Hacer clic en el buscador y escribir el nombre del registro.</p>
            </div>

          </div>

        </div>

      </Carousel.Item>
    </Carousel>
  );
}

export default ComoRegistrar;
