import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./src/database/db.js";
import colorRoutes from "./src/routes/color.routes.js";
dotenv.config();

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());
app.use("/api/colores", colorRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
