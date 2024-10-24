import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";

const plantas = express.Router();

// GET /plantas - Obtener todas las plantas
plantas.get("/plantas", async (req, res) => {
  try {
    const [plantas] = await db.execute("SELECT * FROM plantas");
    res.status(200).send(plantas);
  } catch (error) {
    console.error("Error obteniendo plantas:", error);
    res.status(500).send({ error: "Error al obtener plantas" });
  }
});

// POST /plantas - Enviar datos de registro
plantas.post(
  "/plantas",
  [
    // Validaciones
    body("idPlanta").isInt().withMessage("El id de la planta debe ser un número entero."),
    body("alturaCrecimiento").isFloat({ min: 0 }).withMessage("Altura de crecimiento debe ser mayor a 0."),
    body("tempAmbiente").isFloat({ min: -10, max: 50 }).withMessage("La temperatura ambiente debe estar entre -10 y 50 grados."),
    body("caudalAgua").isFloat({ min: 0 }).withMessage("El caudal de agua debe ser mayor a 0."),
    body("ph").isFloat({ min: 0, max: 14 }).withMessage("El pH debe estar entre 0 y 14."),
    body("humedadAmbiente").isFloat({ min: 0, max: 100 }).withMessage("Humedad ambiente debe estar entre 0% y 100%."),
    body("humedadSuelo").isFloat({ min: 0, max: 100 }).withMessage("Humedad del suelo debe estar entre 0% y 100%."),
  ],
  async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    try {
      const {
        idPlanta,
        alturaCrecimiento,
        tempAmbiente,
        caudalAgua,
        ph,
        humedadAmbiente,
        humedadSuelo,
        observaciones,
      } = req.body;

      const query = `
        INSERT INTO registros (id_planta, altura_crecimiento, temperatura_ambiente, caudal_agua, ph, humedad_ambiente, humedad_suelo, observaciones, dia_revision, hora_revision)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, current_date(), current_time())
      `;

      const [result] = await db.execute(query, [
        idPlanta,
        alturaCrecimiento,
        tempAmbiente,
        caudalAgua,
        ph,
        humedadAmbiente,
        humedadSuelo,
        observaciones,
      ]);

      res.status(201).send({ message: "Registro creado exitosamente", idRegistro: result.insertId });
    } catch (error) {
      console.error("Error creando el registro:", error);
      res.status(500).send({ error: "Error al crear el registro" });
    }
  }
);

export default plantas;
