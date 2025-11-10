import Carousel from "react-bootstrap/Carousel";
import paso1 from "../../../assets/capacitacion/comoEliminar/paso1.png";
import paso2 from "../../../assets/capacitacion/comoEliminar/paso2.png";
import paso3 from "../../../assets/capacitacion/comoEliminar/paso3.png";

function ComoEliminar() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src={paso1}
          alt="Paso 1"
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />

        <div className="color-texto">
          <h3>Paso 1</h3>
          <p>Busque el registro que desee eliminar y seleccione el botón de papelera 🗑️ ubicado al lado izquierdo del registro.</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={paso2}
          alt="Paso 2"
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />

        <div className="color-texto">
          <h3>Paso 2</h3>
          <p>Confirme que desea eliminar el registro precionando "Eliminar".</p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={paso3}
          alt="Paso 3"
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />

        <div className="color-texto">
          <h3>Paso 3</h3>
          <p>Visualice los cambios en la tabla!</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default ComoEliminar;
