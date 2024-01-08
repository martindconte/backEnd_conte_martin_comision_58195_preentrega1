import express from "express";
import productsRouter from "./router/productsRoutes.js";
import cartRouter from "./router/cartRoutes.js"

// Crear la app
const app = express();
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())

// Carpeta Publica
app.use( express.static( 'public' ))

// Routing
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

// Definir un puerto y arrancar el proyecto
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening app port ${server.address().port}`)
})