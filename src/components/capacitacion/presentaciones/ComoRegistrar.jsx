import Carousel from "react-bootstrap/Carousel";
import paso1 from "../../../assets/capacitacion/comoRegistrar/paso1.png";

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
          <p>Aquí explicas el primer paso con detalle.</p>
        </div>
      </Carousel.Item>

            <Carousel.Item>
        <img
          src={paso1}
          alt="Paso 1"
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />

        <div className="color-texto">
          <h3>Paso 1</h3>
          <p>Aquí explicas el primer paso con detalle.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default ComoRegistrar;
