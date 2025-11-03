import React from "react";
import ListadoEmpleados from "./empleados/ListadoEmpleados";

export default function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h3">Sistema RH - Listado de Empleados</h1>
        <p className="text-muted">
          Fase 1 — Listado básico usando axios y Bootstrap
        </p>
      </header>

      <main>
        <ListadoEmpleados />
      </main>
    </div>
  );
}
