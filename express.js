const express = require('express')
const app = express();

const fsController = require ('./server.js')

app.get('/api/products', async (req, res) => {
    const products = await fsController.readProducts()
    res.status(200).json(products)
})

// Creare un nuovo endpoint che, dato un url tipo: /api/v1/products/123 restituisce solo il prodotto specifico con id "123"
// gitignore node_modules

const port = 8080
app.listen(port, () => console.log(`listening on ${port}`))