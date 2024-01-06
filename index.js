import express from "express";

// Crear la app
const app = express();

// Routing
app.get('/', (req, resp) => {
    resp.send('<h1 style="color: red">Servidor Express</h1>')
})

// Definir un puerto y arrancar el proyecto
const port = 8080;

const server = app.listen(port, () => {
    console.log(`Listening app port ${server.address().port}`)
})