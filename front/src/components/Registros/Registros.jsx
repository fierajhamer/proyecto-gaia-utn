import { useEffect, useState } from "react";
import "./Registros.css";

export default function Registros() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/registros")
      .then((response) => response.json())
      .then((data) => {
        setRegistros(data);
      })
      .catch((error) => {
        console.error("Error al obtener los registros:", error);
      });
  }, []);

  return (
    <div className="Registros-container">
      <table>
        <thead>
          <tr>
            <th>ID Planta</th>
            <th>Altura de crecimiento</th>
            <th>Observaciones</th>
            <th>Día de revisión</th>
            <th>Hora de revisión</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id_registro}>
              <td>{registro.id_planta}</td>
              <td>{registro.altura_crecimiento} cm</td>
              <td>{registro.observaciones}</td>
              <td>{registro.dia_revision}</td>
              <td>{registro.hora_revision}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
