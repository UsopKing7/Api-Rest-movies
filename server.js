#!/usr/bin/env node
import express from "express";
import routes from "./src/controllers/index.js";
import fsp from "fs/promises";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    console.log('peticion recivida...', req.url)
    const data = await fsp.readFile("./src/views/index.html", "utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(404).json({ error: error.errors})
  }
});

app.use('/src/views', express.static("src/views"));
// los Gets dando informcion al usuaior

routes.forEach((routes) => app.use("/movies", routes));

app.use((req, res) => {
    console.log('peticion recivida...', req.url)
    res.status(404).json({ message: "Error 404 - Not Found" });
  });
  

// servidor escuchando en el puerto
const port = process.env.PORT ?? 3333;
app.listen(port, "0.0.0.0", () => {
  console.log("Servidor => http://0.0.0.0:" + port);
});
