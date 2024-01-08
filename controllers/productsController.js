import { ProductManager } from "../models/Products.js"

const productManager = new ProductManager('public/data')

const getProducts = async ( req, res ) => {
    try {
        const products = await productManager.getProducts()
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}

const getProductById = async ( req, res ) => {
    try {
        const product = await productManager.getProductsById(req.params.pid)
        res.send(product)
    } catch (error) {
        console.log(error)
    }
}

const addProducts = async ( req, res ) => {
    try {
        await productManager.addProduct(req.body)
        res.send('<h1 style="color: red">El producto a sido Agregado a la Lista de Productos </h1>')
    } catch (error) {
        console.log(error)
    }
}

const updatedProduct = async ( req, res ) => {
    try {
        await productManager.updateProduct( req.params.pid ,  req.body )
        res.send('<h1 style="color: red">El producto a sido modificado </h1>')
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async ( req, res ) => {
    try {
        console.log('Eliminando...')
        await productManager.deleteProduct( req.params.pid )
        res.send(res.send('<h1 style="color: red">El producto {req.params.id} a sido ELIMINADO</h1>'))
    } catch (error) {
        
    }
}


export {
    getProducts,
    getProductById,
    addProducts,
    updatedProduct,
    deleteProduct
}

