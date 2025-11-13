// src/layouts/LayoutPrivado.jsx
// src/components/navegation/LayoutPrivado.jsx
import { Outlet } from "react-router-dom";
import Encabezado from "./Encabezado";

export default function LayoutPrivado() {
  return (
    <>
      <Encabezado />
      <main className="margen-superior-main">
        <Outlet />
      </main>
    </>
  );
}