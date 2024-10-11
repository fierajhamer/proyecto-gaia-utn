import express from "express"
import cors from "cors"
import registros from "./registros.js"
import plantas from "./plantas.js";
import { conectarDB } from "./db.js";

const app = express()
const port = 3000;

conectarDB();
console.log("Conectado a base de datos");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/", plantas)

app.use("/", registros);

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en: ${port}`);
});
