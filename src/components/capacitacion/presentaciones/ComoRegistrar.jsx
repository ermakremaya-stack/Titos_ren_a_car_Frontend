import Carousel from "react-bootstrap/Carousel";
import paso1 from "../../../assets/capacitacion/comoRegistrar/paso1.png";

function ComoRegistrar() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src={paso1}
          style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />
          <h3 className="color-texto">Paso 1</h3>
          <p className="color-texto">Aquí explicas el primer paso con detalle.</p>

      </Carousel.Item>

      <Carousel.Item>
        <img src={paso1} style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }} />
        <Carousel.Caption>
          <h3>Paso 1</h3>
          <p>Aquí explicas el primer paso con detalle.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ComoRegistrar;
