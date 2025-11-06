import React from "react";

import { Form, InputGroup } from "react-bootstrap";

const CuadroBusquedas = ({ textoVisible, manejarCambioBusqueda }) => {
  return (
    //Definimos el formato del cuadro de busqueda utilizando componentes de react-bootstrap
    <InputGroup className="md-3" style = {{ width: "100%"}}>
      {/* Formato de busqueda */}
      <InputGroup.Text>
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      {/* Campo de entrada de texto para la búsqueda definiendo 
      carateristicas: Tipo de entrada: text, Cuando no haya nada que salga un texto: 
      Buscar..., y que actualize la tabla con cada cambio en el imput */}
      <Form.Control
      type="text"
      placeholder="Buscar..."
      value= {textoVisible}
      onChange={manejarCambioBusqueda}
      />
    </InputGroup>
  );
};

export default CuadroBusquedas;