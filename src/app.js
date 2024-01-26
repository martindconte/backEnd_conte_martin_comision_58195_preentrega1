import express from 'express';
import productsRouter from './router/products.routes.js';
import cartRouter from './router/cart.routes.js'
import __dirname from './util.js';

// Crear la app
const app = express();
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())

// Carpeta Publica
app.use(express.static(__dirname + '/public'))
console.log(__dirname)

// Routing
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

// Definir un puerto y arrancar el proyecto
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening app port ${server.address().port}`)
})