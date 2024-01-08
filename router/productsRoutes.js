import express from "express"
import { getProducts, addProducts, updatedProduct, getProductById, deleteProduct } from "../controllers/productsController.js"

const router = express.Router()

// router.get('/', (req, res) => {
//     res.send('<h1 style="color: red">Servidor Express // Desde Products</h1>')
// })

router.route('/')
    .get( getProducts )
    .post( addProducts )

router.route('/:pid')
    .get( getProductById )
    .put( updatedProduct )
    .delete( deleteProduct )




// router.route('/')
//     .get(( req, res ) => {
//         res.send('<h1 style="color: red">Servidor Express // GET Productos Desde Products</h1>')     
//     })
//     .post(( req, res ) => {
//         res.send('<h1 style="color: red">Servidor Express // POST Productos Desde Products</h1>')
//     })

// router.route('/:pid')
//     .get(( req, res ) => {
//         res.send('<h1 style="color: red">Servidor Express // GET Productos x ID Desde Products</h1>')
//     })
//     .put(( req, res ) => {
//         res.send('<h1 style="color: red">Servidor Express // PUT Productos x ID Desde Products</h1>')
//     })
//     .delete(( req, res ) => {
//         res.send('<h1 style="color: red">Servidor Express // DELETE Productos x ID Desde Products</h1>')
//     })

export default router