import { useState, useEffect } from "react";
import "./Formulario.css"

export default function Formulario() {
  const [idPlanta, setIdPlanta] = useState("");
  const [tipoRiego, setTipoRiego] = useState(1);
  const [alturaCrecimiento, setAlturaCrecimiento] = useState("");
  const [tempAmbiente, setTempAmbiente] = useState("");
  const [caudalAgua, setCaudalAgua] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [plantas, setPlantas] = useState([]);

  // useEffect para obtener las plantas cuando el componente se monte
  useEffect(() => {
    fetch("http://localhost:3000/plantas")
      .then((response) => response.json())
      .then((data) => {
        setPlantas(data);  // Guardar las plantas en el estado
      })
      .catch((error) => {
        console.error("Error obteniendo las plantas:", error);
      });
  }, []);

  const handleEnviarDatos = () => {
    if (idPlanta !== "") {

   
    const datosPlanta = {
      idPlanta,
      tipoRiego,
      alturaCrecimiento,
      tempAmbiente,
      caudalAgua,
      observaciones,
    };


    fetch("http://localhost:3000/plantas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPlanta),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
        setIdPlanta("");
        setTipoRiego(1);
        setAlturaCrecimiento("");
        setTempAmbiente("");
        setCaudalAgua("");
        setObservaciones("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      } else {
        alert("Ingrese la ID de la Planta")
      }
  };

  return (
    <div className="Formulario-container">
      <div className="input">
        <span>Planta</span>
        <select value={idPlanta} onChange={(event) => setIdPlanta(event.target.value)}>
          <option value="">Selecciona una planta</option>
          {plantas.map((planta) => (
            <option key={planta.id_planta} value={planta.id_planta}>
              {planta.alumno_asignado}
            </option>
          ))}
        </select>
      </div>

      <div className="input">
        <span>Tipo de riego</span>
        <select value={tipoRiego} onChange={(event) => setTipoRiego(event.target.value)}>
          <option value="1">Aspersión</option>
          <option value="2">Goteo</option>
          <option value="3">Microaspersión</option>
        </select>
      </div>

      <div className="input">
        <span>Altura de crecimiento</span>
        <input
          type="number"
          value={alturaCrecimiento}
          placeholder="En centímetros"
          onChange={(event) => setAlturaCrecimiento(event.target.value)}
        />
      </div>

      <div className="input">
        <span>Temperatura ambiente</span>
        <input
          type="number"
          value={tempAmbiente}
          placeholder="En grados celsius"
          onChange={(event) => setTempAmbiente(event.target.value)}
        />
      </div>

      <div className="input">
        <span>Caudal de agua</span>
        <input
          type="number"
          value={caudalAgua}
          placeholder="En ml/h"
          onChange={(event) => setCaudalAgua(event.target.value)}
        />
      </div>

      <div className="input">
        <span>Observaciones (opcional)</span>
        <input
          type="text"
          value={observaciones}
          onChange={(event) => setObservaciones(event.target.value)}
        />
      </div>

      <button onClick={handleEnviarDatos}>Enviar datos</button>
    </div>
  );
}
