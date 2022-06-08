import express from 'express'
const router = express.Router()

export const init = () => {
    console.log('Init all routes')
    router.post('/api/v1/products', (req: any, res: any) => {
        res.status(201).json(req.body)
    })
    router.get('/api/v1/products', (req: any, res: any) => {
        res.status(201).json(res)
    })
}
