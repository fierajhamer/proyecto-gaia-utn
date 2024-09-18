import { useState, useEffect } from "react";
import "./Formulario.css"

export default function Formulario() {
  const [idPlanta, setIdPlanta] = useState(1);
  const [tipoRiego, setTipoRiego] = useState(1);
  const [alturaCrecimiento, setAlturaCrecimiento] = useState(0);
  const [tempAmbiente, setTempAmbiente] = useState(0);
  const [caudalAgua, setCaudalAgua] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [plantas, setPlantas] = useState([]);

  // useEffect para obtener las plantas cuando el componente se monte
  useEffect(() => {
    fetch("http://localhost:3000/api/plantas")
      .then((response) => response.json())
      .then((data) => {
        setPlantas(data);  // Guardar las plantas en el estado
      })
      .catch((error) => {
        console.error("Error obteniendo las plantas:", error);
      });
  }, []);

  const handleEnviarDatos = () => {
    const datosPlanta = {
      idPlanta,
      tipoRiego,
      alturaCrecimiento,
      tempAmbiente,
      caudalAgua,
      observaciones,
    };

    fetch("http://localhost:3000/api/subir-datos-planta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPlanta),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="Formulario-container">
      <div className="input">
        <span>Planta</span>
        <select onChange={(event) => setIdPlanta(event.target.value)}>
          {plantas.map((planta) => (
            <option key={planta.id_planta} value={planta.id_planta}>
              {planta.alumno_asignado}
            </option>
          ))}
        </select>
      </div>

      <div className="input">
        <span>Tipo de riego</span>
        <select onChange={(event) => setTipoRiego(event.target.value)}>
          <option value="1">Aspersión</option>
          <option value="2">Goteo</option>
          <option value="3">Microaspersión</option>
        </select>
      </div>

      <div className="input">
        <span>Altura de crecimiento</span>
        <input
          type="number"
          placeholder="En centímetros"
          onChange={(event) => setAlturaCrecimiento(event.target.value)}
        />
      </div>

      <div className="input">
        <span>Temperatura ambiente</span>
        <input
          type="number"
          placeholder="En grados celsius"
          onChange={(event) => setTempAmbiente(event.target.value)}
        />
      </div>

      <div className="input">
        <span>Caudal de agua</span>
        <input
          type="number"
          placeholder="En ml/h"
          onChange={(event) => setCaudalAgua(event.target.value)}
        />
      </div>

      <div className="input">
        <span>Observaciones (opcional)</span>
        <input
          type="text"
          onChange={(event) => setObservaciones(event.target.value)}
        />
      </div>

      <button onClick={handleEnviarDatos}>Enviar datos</button>
    </div>
  );
}
