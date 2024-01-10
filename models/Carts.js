import fs from 'fs'
import path from 'path';
import { generateId, readFile } from '../helpers/functions.js';

class CartManager {
    constructor(folderPath) {
        this.cart = [];
        this.folderPath = path.resolve(folderPath);
        this.filePath = path.join(folderPath, 'carts.json');
    }

    newCart = async () => {

        try {
            await this._createFolderAndFile()
            const data = await this._readFile()

            const newCart = {
                id: generateId(),
                products: []
            };

            this.cart = [...data, newCart]
            await this._writeFile(this.cart)

        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (id) => {
        const data = await this._readFile();
        const product = data.find(prod => prod.id === id);
        return product || `Cart with id: ${id} not found`;
    }

    addProductToCart = async (idCart, idProduct) => {
        try {
            const carts = await this._readFile()
            const products = await readFile('public/data/products.json')

            if (!carts.length || !products.length) throw new Error('No existen productos o Carritos creados. Cree un nuevo carrito o cargue productos')

            const product = products.find(product => product.id === idProduct)
            if (!product) throw new Error(`Not found product by id: ${idProduct}`)

            const cartId = carts.find(cart => cart.id === idCart)
            if (!cartId) throw new Error(`Cart not found with id: ${idCart}`)

            const productsIdInCart = [...cartId.products]
            const productExistInCart = productsIdInCart.some(product => product.id === idProduct)

            const newAdd = productExistInCart
                ?
                productsIdInCart.map(product => {
                    return product.id === idProduct
                        ?  {
                            ...product,
                            quantity: Number(product.quantity) + 1
                        }
                        : product
                })
                : [
                    ...productsIdInCart,
                    {
                        id: idProduct,
                        quantity: 1
                    }
                ] 

            this.cart = carts.map(cart => {
                if (cart.id === idCart) return { ...cart, products: [...newAdd] }
                return cart
            })

            await this._writeFile(this.cart)
        } catch (error) {
            console.log(error)
        }

    }

    _createFolderAndFile = async () => {
        try {
            await fs.promises.access(this.folderPath, fs.constants.F_OK,)
            await fs.promises.access(this.filePath, fs.constants.F_OK)
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('La carpeta o el archivo que contienen al carrito no existen. Creando...');
                await fs.promises.mkdir(this.folderPath, { recursive: true });
                await fs.promises.writeFile(this.filePath, JSON.stringify([]));
            }
        }
    };

    _readFile = async () => {
        try {
            const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');
            const data = JSON.parse(fileContent);
            return data
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("No existe el archivo... O aun no fue creado");
                return null;
            } else {
                throw error;
            }
        }
    }

    _writeFile = async (data) => {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data));
        } catch (error) {
            throw error;
        }
    }
}

export {
    CartManager
}