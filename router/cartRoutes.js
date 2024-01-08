import express from "express"

const router = express.Router()

router.get('/', (req, resp) => {
    resp.send('<h1 style="color: red">Servidor Express /// Desde Cart</h1>')
})

export default router