const express = require('express')
const app = express();

const fsController = require ('./server.js')

app.get('/api/products', async (req, res) => {
    const products = await fsController.readProducts()
    res.status(200).json(products)
})

// Creare un nuovo endpoint che, dato un url tipo: /api/v1/products/123 restituisce solo il prodotto specifico con id "123"
// gitignore node_modules

app.get('/api/products/:productId', async (req, res) => {
    const products = await fsController.readProducts()
    for (singleproduct of products){  
        if (singleproduct.id == req.params.productId){
            res.status(200).json(singleproduct)
        }  
    }
    res.status(204).end()
})

const port = 8080
app.listen(port, () => console.log(`listening on ${port}`))