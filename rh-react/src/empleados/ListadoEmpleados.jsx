import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";

const urlBase = "http://127.0.0.1:5000/api/empleados/";

export default function ListadoEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  // Cargar empleados al montar el componente
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await axios.get(urlBase);
      setEmpleados(respuesta.data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">Listado de Empleados</h5>

      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Sueldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((emp) => (
              <tr key={emp.idEmpleado}>
                <td>{emp.idEmpleado}</td>
                <td>{emp.nombre}</td>
                <td>{emp.departamento}</td>
                <td>
                  <NumericFormat
                    value={emp.sueldo}
                    displayType={"text"}
                    thousandSeparator=","
                    prefix="$"
                  />
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hay empleados registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
