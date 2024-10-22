import express from "express";
import { db } from "./db.js";

const plantas = express.Router();

// GET /plantas
// Obtener todas las plantas
plantas.get("/plantas", async (req, res) => {
  const [plantas] = await db.execute("SELECT * FROM plantas");
  res.send(plantas);
});

// POST /plantas
// Enviar datos de registro
plantas.post('/plantas', async (req, res) => {
  const { idPlanta, alturaCrecimiento, tempAmbiente, caudalAgua, ph, humedad, observaciones } = await req.body;

  const query = `
    INSERT INTO registros (id_planta, altura_crecimiento, temperatura_ambiente, caudal_agua, ph, humedad, observaciones, dia_revision, hora_revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, current_date(), current_time())
  `;
  
  const [plantas] = await db.execute(query, [idPlanta, alturaCrecimiento, tempAmbiente,  caudalAgua, ph, humedad, observaciones]);
  res.send(plantas);
});

export default plantas;