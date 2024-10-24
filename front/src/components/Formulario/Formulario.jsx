import { useState, useEffect } from "react";
import "./Formulario.css";

export default function Formulario() {
  const [idPlanta, setIdPlanta] = useState("");
  const [alturaCrecimiento, setAlturaCrecimiento] = useState("");
  const [tempAmbiente, setTempAmbiente] = useState("");
  const [caudalAgua, setCaudalAgua] = useState("");
  const [ph, setPh] = useState("");
  const [humedadAmbiente, setHumedadAmbiente] = useState("");
  const [humedadSuelo, setHumedadSuelo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [plantas, setPlantas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [errores, setErrores] = useState({});
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch("http://192.168.1.16:3000/plantas")
      .then((response) => response.json())
      .then((data) => {
        setPlantas(data);
      })
      .catch((error) => {
        console.error("Error obteniendo las plantas:", error);
      });
  }, []);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!idPlanta) {
      nuevosErrores.idPlanta = "Debe seleccionar una planta.";
    }
    if (!alturaCrecimiento || alturaCrecimiento <= 0) {
      nuevosErrores.alturaCrecimiento = "Ingrese una altura válida (mayor a 0).";
    }
    if (!tempAmbiente || tempAmbiente < -10 || tempAmbiente > 50) {
      nuevosErrores.tempAmbiente = "Debe estar entre -10°C y 50°C.";
    }
    if (!caudalAgua || caudalAgua <= 0) {
      nuevosErrores.caudalAgua = "Debe ser mayor a 0 ml/h.";
    }
    if (!ph || ph < 0 || ph > 14) {
      nuevosErrores.ph = "Debe estar entre 0 y 14.";
    }
    if (!humedadAmbiente || humedadAmbiente < 0 || humedadAmbiente > 100) {
      nuevosErrores.humedadAmbiente = "Debe estar entre 0% y 100%.";
    }
    if (!humedadSuelo || humedadSuelo < 0 || humedadSuelo > 100) {
      nuevosErrores.humedadSuelo = "Debe estar entre 0% y 100%.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleConfirmarEnvio = () => {
    if (validarFormulario()) {
      setMostrarConfirmacion(true);
    } else {
      setMensaje("Hay errores en el formulario.");
    }
  };

  const handleEnviarDatos = () => {
    setEnviando(true);

    const datosPlanta = {
      idPlanta,
      alturaCrecimiento,
      tempAmbiente,
      caudalAgua,
      ph,
      humedadAmbiente,
      humedadSuelo,
      observaciones,
    };

    fetch("http://192.168.1.16:3000/plantas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPlanta),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
        setMensaje("Datos enviados exitosamente");
        setIdPlanta("");
        setAlturaCrecimiento("");
        setTempAmbiente("");
        setCaudalAgua("");
        setPh("");
        setHumedadAmbiente("");
        setHumedadSuelo("");
        setObservaciones("");
        setMostrarConfirmacion(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMensaje("Error al enviar los datos");
      })
      .finally(() => {
        setEnviando(false);
      });
  };

  const handleCancelarEnvio = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <div className="contact-form">
      <span className="heading">Formulario de registros</span>

      <form>
        <label htmlFor="idPlanta">Planta: {errores.idPlanta && <p className="error">{errores.idPlanta}</p>}</label>
        <select value={idPlanta} onChange={(event) => setIdPlanta(event.target.value)}>
          <option value="" disabled defaultValue={""}>Seleccione una planta</option>
          {plantas.map((planta) => (
            <option key={planta.id_planta} value={planta.id_planta}>
              {planta.alumno_asignado}
            </option>
          ))}
        </select>

        <label htmlFor="alturaCrecimiento">Altura de crecimiento: {errores.alturaCrecimiento && <p className="error">{errores.alturaCrecimiento}</p>}</label>
        <input
          type="number"
          value={alturaCrecimiento}
          placeholder="En centímetros"
          onChange={(event) => setAlturaCrecimiento(event.target.value)}
        />

        <label htmlFor="tempAmbiente">Temperatura ambiente: {errores.tempAmbiente && <p className="error">{errores.tempAmbiente}</p>}</label>
        <input
          type="number"
          value={tempAmbiente}
          placeholder="En grados celsius"
          onChange={(event) => setTempAmbiente(event.target.value)}
        />

        <label htmlFor="caudalAgua">Caudal de agua: {errores.caudalAgua && <p className="error">{errores.caudalAgua}</p>}</label>
        <input
          type="number"
          value={caudalAgua}
          placeholder="En ml/h"
          onChange={(event) => setCaudalAgua(event.target.value)}
        />

        <label htmlFor="ph">pH: {errores.ph && <p className="error">{errores.ph}</p>}</label>
        <input
          type="number"
          value={ph}
          placeholder="Ingrese el pH"
          onChange={(event) => setPh(event.target.value)}
        />

        <label htmlFor="humedadAmbiente">Humedad ambiente (%): {errores.humedadAmbiente && <p className="error">{errores.humedadAmbiente}</p>}</label>
        <input
          type="number"
          value={humedadAmbiente}
          placeholder="Ingrese la humedad ambiente"
          onChange={(event) => setHumedadAmbiente(event.target.value)}
        />

        <label htmlFor="humedadSuelo">Humedad del suelo (%): {errores.humedadSuelo && <p className="error">{errores.humedadSuelo}</p>}</label>
        <input
          type="number"
          value={humedadSuelo}
          placeholder="Ingrese la humedad del suelo"
          onChange={(event) => setHumedadSuelo(event.target.value)}
        />

        <label htmlFor="observaciones">Observaciones (opcional):</label>
        <textarea
          value={observaciones}
          onChange={(event) => setObservaciones(event.target.value)}
        />

        <button type="button" onClick={handleConfirmarEnvio}>Enviar datos</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>

      {mostrarConfirmacion && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Envío</h2>
            <p>Planta de: {plantas.find(planta => planta.id_planta == idPlanta)?.alumno_asignado}</p>
            <p>Altura de crecimiento: {alturaCrecimiento} cm</p>
            <p>Temperatura ambiente: {tempAmbiente} °C</p>
            <p>Caudal de agua: {caudalAgua} ml/h</p>
            <p>pH: {ph}</p>
            <p>Humedad ambiente: {humedadAmbiente} %</p>
            <p>Humedad del suelo: {humedadSuelo} %</p>
            <button
              onClick={handleEnviarDatos}
              disabled={enviando}
            >
              {enviando ? "Enviando..." : "Confirmar"}
            </button>
            <button onClick={handleCancelarEnvio}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
