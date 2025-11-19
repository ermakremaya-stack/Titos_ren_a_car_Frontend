import React from "react";
import { useState } from "react";
import ComoRegistrar from "../components/capacitacion/presentaciones/ComoRegistrar.jsx"
import BarraOpciones from "../components/capacitacion/BarraOpciones.jsx"
import ComoEditar from "../components/capacitacion/presentaciones/ComoRegistrar.jsx";
import ComoEliminar from "../components/capacitacion/presentaciones/ComoEliminar.jsx";

const Capacitacion = () => {
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);

  const desSeleccionarPregunta = (codigo) => {
      setPreguntaSeleccionada(prev => prev === codigo ? null : codigo);
    };

  return (
    <>
      <br/>
      <br/>
      <br/>
      
      <BarraOpciones onSelectPregunta={desSeleccionarPregunta} />

      <div style={{ padding: "20px" }}>
        {preguntaSeleccionada === "p1" && <ComoRegistrar />}
        {preguntaSeleccionada === "p2" && <ComoEditar />}
        {preguntaSeleccionada === "p3" && <ComoEliminar />}
      </div>

    </>

  );

};

export default Capacitacion;

// Card https://react-bootstrap.netlify.app/docs/components/cards

//Carousels https://react-bootstrap.netlify.app/docs/components/carousel sirve para mostrar imagenes en secuencia perfecto para el inicio de secion o registrpo dedatos

//Close button https://react-bootstrap.netlify.app/docs/components/close-button

//Images https://react-bootstrap.netlify.app/docs/components/images para imagenes

// Modals https://react-bootstrap.netlify.app/docs/components/modal  sirve para dar ventanas emergentes

// Navbars https://react-bootstrap.netlify.app/docs/components/navbar barra que desglosa mas cosas

//Offcanvas https://react-bootstrap.netlify.app/docs/components/offcanvas  Desglosa la barra lateral izquierda

//PLaceholders https://react-bootstrap.netlify.app/docs/components/placeholder

// Tabbed components  https://react-bootstrap.netlify.app/docs/components/tabs

//Toast https://react-bootstrap.netlify.app/docs/components/toasts Sirve para mandar mensajes