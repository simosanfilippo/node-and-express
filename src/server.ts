import express from 'express'
const app = express()

import { DatabaseInstance } from './database'
import { ProductService } from './services/products'
const port = 8080

app.use(express.json())

// const productRoutes = require('./router.js');
// app.use('/api/products/', productRoutes);

app.post('/api/v1/products', async (req: any, res: any) => {
    try {
        console.log('server risponde')
        const service = new ProductService()
        const result = await service.create(req.body)

        res.status(201).json(result)
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})
app.get('/api/v1/products', async (req: any, res: any) => {
    try {
        const service = new ProductService()
        const results = await service.list({
            skip: req.query.skip,
            take: req.query.take,
        })

        res.status(200).json(results)
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})
app.listen(port, () => console.log(`listening on ${port}`))
