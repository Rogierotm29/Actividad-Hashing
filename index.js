import express from "express";
import routes from "./routes/routes.js";
import user from "./routes/user.routes.js";
import { pool } from "./db/db.js";
import "dotenv/config";


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}).on("error", (err) => {
    console.error(`Error al iniciar el servidor: ${err.message}`);
});