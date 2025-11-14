import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const usuario = JSON.parse(localStorage.getItem("usuarioTito"));

  // Si no hay usuario → redirige al login
  if (!usuario) {
    return <Navigate to="/inicio" replace />;
  }

  // Si el rol no está permitido → redirige a inicio
  if (!allowedRoles.includes(usuario.rol)) {
    return <Navigate to="/inicio" replace />;
  }

  // Si todo bien → muestra la página
  return children;
}