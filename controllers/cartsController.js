import { CartManager } from "../models/Carts.js";

const cartManager = new CartManager('public/data')

const createNewCart = async ( req, res ) => {
    await cartManager.newCart()
    res.send('<h1 style="color: red">Se ha creado un nuevo carrito</h1>')
}

const getCartById = async ( req, res ) => {
    const cart = await cartManager.getCartById( req.params.cid )
    // res.json(`<h1 style="color: red">Se ha consultado el CARRITO ${JSON.stringify(cart)} </h1>`)
    res.json(cart)
}

const addProductsToCart = async ( req, res ) => {
    try {
        await cartManager.addProductToCart( req.params.cid, req.params.pid )
        const cart = await cartManager.getCartById( req.params.cid )
        res.json(cart)
    } catch (error) {
        console.log(error)
    }
}

export {
    createNewCart,
    getCartById,
    addProductsToCart
}