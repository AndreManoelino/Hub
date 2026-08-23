import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MenuAdministrador from "../pages/Administrador/Menu";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          SITE PÚBLICO
      ===================================================== */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* =====================================================
          LOGIN
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =====================================================
          ÁREAS PROTEGIDAS
          
          Tudo que estiver dentro deste Route precisa
          possuir um token de autenticação.
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        {/* =================================================
            ADMINISTRADOR DO SISTEMA
        ================================================= */}

        <Route
          path="/administrador"
          element={<MenuAdministrador />}
        />

      </Route>

    </Routes>
  );
}