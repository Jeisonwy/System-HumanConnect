import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import UserForm from "./UserForm";
import EditarEmpleado from "./empleados/EditarEmpleado"; // lo crearás en el paso 3

export default function App() {
  return (
    <Router>
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="h3">Registro de usuarios</h1>
          <p className="text-muted">
            Aca podra crear, editar y eliminar usuarios
          </p>
        </header>

        <Routes>
          <Route path="/" element={<ListadoEmpleados />} />
          <Route path="/nuevo" element={<UserForm />} />
          <Route path="/editar/:id" element={<EditarEmpleado />} />
        </Routes>
      </div>
    </Router>
  );
}
