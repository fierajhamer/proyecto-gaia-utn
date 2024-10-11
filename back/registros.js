import express from "express";
import { db } from "./db.js";

const registros = express.Router();

// GET /registros
// Consultar por todos los registros
registros.get("/registros", async (req, res) => {
  const [registros] = await db.execute("SELECT * FROM registros");
  res.send(registros);
});

export default registros;