require('dotenv').config()

import express from 'express'
const app = express()

import { ProductService } from './services/products'
import { CategoryService } from './services/categories'
import { PrismaUtility } from './utilities/prismaUtility'

const jwt = require('jsonwebtoken')

const utility = new PrismaUtility()

const port = 8080

app.use(express.json())

// const productRoutes = require('./router.js');
// app.use('/api/products/', productRoutes);

/* Product */

app.post('/api/v1/products', async (req: any, res: any) => {
    try {
        const service = new ProductService()
        const result = await service.create(req.body)

        res.status(201).json(result)
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})
app.get('/api/v1/products', authenticateToken, async (req: any, res: any) => {
    try {
        const service = new ProductService()
        const results = await service.list({
            skip: req.query.skip,
            take: req.query.take,
            orderBy: req.query.orderBy,
            orderDirection: req.query.orderDirection,
        })
        res.status(200).json(results)
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})

app.get('/api/v1/products/:id', async (req: any, res: any) => {
    try {
        const service = new ProductService()
        const result = await service.findUnique({
            id: req.params.id,
        })
        //console.log(result)

        if (result) {
            return res.status(200).json(result)
        }

        res.status(404).json({ error: 'Product not found' })
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})
app.patch('/api/v1/products/:id', async (req: any, res: any) => {
    try {
        const service = new ProductService()

        const result = await service.update({
            id: req.params.id,
            data: req.body,
        })

        res.status(200).json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json(`Error: ${e}`)
    }
})
app.delete('/api/v1/products/:id', async (req: any, res: any) => {
    try {
        const service = new ProductService()
        const result = await service.delete({
            id: req.params.id,
        })

        if (result) {
            return res.status(202).json(result)
        }

        res.status(404).json({ error: 'Product not found' })
    } catch (e) {
        console.log(e)
        console.log(typeof e)
        const error = utility.resolveError(e)
        res.status(error?.statusCode).json(`Error: ${error?.errorBody}`)
    }
})

/* Category */

app.post('/api/v1/categories', async (req: any, res: any) => {
    try {
        const service = new CategoryService()
        const result = await service.create(req.body)

        res.status(201).json(result)
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})

app.get('/api/v1/categories', async (req: any, res: any) => {
    try {
        const service = new CategoryService()
        const results = await service.list({
            skip: req.query.skip,
            take: req.query.take,
            orderBy: req.query.orderBy,
            orderDirection: req.query.orderDirection,
        })
        res.status(200).json(results)
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})

app.get('/api/v1/category/:id/products', async (req: any, res: any) => {
    try {
        const service = new ProductService()
        const result = await service.list({
            property: { categoryId: req.params.id },
        })

        if (result) {
            return res.status(200).json(result)
        }

        res.status(404).json({ error: 'Category not found' })
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})

app.get('/api/v1/categories/:id', async (req: any, res: any) => {
    try {
        const service = new CategoryService()
        const result = await service.findUnique({
            id: req.params.id,
        })
        //console.log(result)

        if (result) {
            return res.status(200).json(result)
        }

        res.status(404).json({ error: 'Category not found' })
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})
app.patch('/api/v1/categories/:id', async (req: any, res: any) => {
    try {
        const service = new CategoryService()

        const result = await service.update({
            id: req.params.id,
            data: req.body,
        })

        res.status(200).json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json(`Error: ${e}`)
    }
})
app.delete('/api/v1/categories/:id', async (req: any, res: any) => {
    try {
        const service = new CategoryService()
        const result = await service.delete({
            id: req.params.id,
        })

        if (result) {
            return res.status(202).json(result)
        }

        res.status(404).json({ error: 'Product not found' })
    } catch (e) {
        console.log(e)
        res.status(500).json(`Error: ${e}`)
    }
})

function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, user: any) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        }
    )
}

app.listen(port, () => console.log(`listening on ${port}`))
