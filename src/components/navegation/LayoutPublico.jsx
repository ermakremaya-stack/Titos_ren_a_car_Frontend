// src/components/navegation/LayoutPublico.jsx
import { Outlet } from "react-router-dom";

export default function LayoutPublico() {
  return (
    <main className="margen-superior-main">
      <Outlet />
    </main>
  );
}
