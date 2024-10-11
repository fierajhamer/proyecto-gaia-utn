import express from "express";
import { db } from "./db.js";

const plantas = express.Router();

// GET /plantas
// Obtener todas las plantas
plantas.get("/plantas", async (req, res) => {
  const [plantas] = await db.execute("SELECT * FROM plantas");
  res.send(plantas);
});

plantas.post('/plantas', async (req, res) => {
  const { idPlanta, tipoRiego, alturaCrecimiento, tempAmbiente, caudalAgua, observaciones } = await req.body;

  const query = `
    INSERT INTO registros (id_planta, altura_crecimiento, temperatura_ambiente, observaciones, dia_revision, hora_revision, id_tipo_riego, caudal_agua)
    VALUES (?, ?, ?, ?, current_date(), current_time(), ?, ?)
  `;
  
  const [plantas] = await db.execute(query, [idPlanta, alturaCrecimiento, tempAmbiente, observaciones, tipoRiego, caudalAgua]);
  res.send(plantas);
});

/*

// POST /personas/
// Agregar nueva persona
personas.post("/", async (req, res) => {
  const {dni, apellido, nombre} = req.body;

  const [result] = await db.execute(
    "INSERT INTO datos_personales (dni, apellido, nombre) values (?, ?, ?)",
    [dni, apellido, nombre]
  );

  res
    .status(201)
    .send({ persona: { id: result.insertId, dni, apellido, nombre } });
});


// PUT /personas/:id
// Modificar persona
personas.put("/:id", validarId,  async (req, res) => {
  const id = Number(req.params.id)
  
  
  ;
  const {dni, apellido, nombre} = req.body;

  await db.execute("UPDATE datos_personales SET dni=?, apellido=?, nombre=? WHERE id_persona=?", [dni, apellido, nombre, id]);

  res.send({ persona: { id: parseInt(id), dni, apellido, nombre } });
});

// DELETE /personas/:id
// Quitar persona
personas.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await db.execute("DELETE FROM datos_personales WHERE id_persona=?", [id]);

  res.send({ id: parseInt(id) });
});

*/

export default plantas;