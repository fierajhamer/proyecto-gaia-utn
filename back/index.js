import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "V{XFyH;x7jdc3=^L$`9<Y}",
  database: "proyecto_gaia",
});

connection.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err.stack);
    return;
  }
  console.log(
    "Conectado a la base de datos MySQL como id " + connection.threadId
  );
});

app.post('/api/subir-datos-planta', (req, res) => {
  const { idPlanta, tipoRiego, alturaCrecimiento, tempAmbiente, caudalAgua, observaciones } = req.body;

  const query = `
    INSERT INTO registros (id_planta, altura_crecimiento, temperatura_ambiente, observaciones, dia_revision, hora_revision, id_tipo_riego, caudal_agua)
    VALUES (?, ?, ?, ?, current_date(), current_time(), ?, ?)
  `;

  // Ejecutar la consulta
  connection.query(query, [idPlanta, alturaCrecimiento, tempAmbiente, observaciones, tipoRiego, caudalAgua], (err, results) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      return res.status(500).json({ error: 'Error al insertar datos' });
    }
    res.json({ mensaje: 'Datos insertados correctamente', datos: req.body });
  });
});

app.get('/api/plantas', (req, res) => {
  const query = 'SELECT id_planta, alumno_asignado FROM plantas';
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo las plantas:', error);
      res.status(500).json({ mensaje: 'Error obteniendo las plantas' });
    } else {
      res.json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
