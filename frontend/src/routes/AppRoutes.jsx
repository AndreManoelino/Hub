import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MenuAdministrador from "../pages/Administrador/Menu";


export default function AppRoutes() {
  return (
    <Routes>

      {/* SITE */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* ADMINISTRADOR DO SISTEMA */}
      <Route
        path="/administrador"
        element={<MenuAdministrador />}
      />

    </Routes>
  );
}