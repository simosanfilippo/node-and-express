require('dotenv').config()

import { UserService } from './services/users'

import express from 'express'
const app = express()
const jwt = require('jsonwebtoken')

const port = 4000

app.use(express.json())

let refreshTokens: any = []

//Authentication
app.post('/api/v1/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = { email: email, password: password }
    try {
        const service = new UserService()
        const result = await service.verifyPassword({
            email,
            password,
        })
        if (result) {
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(
                user,
                process.env.REFRESH_TOKEN_SECRET
            )
            refreshTokens.push(refreshToken)
            return res.json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        }

        res.status(404).json({ error: 'User not found or wrong password' })
    } catch (e) {
        res.status(500).json(`Error: ${e}`)
    }
})

function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
}
app.post('/api/v1/token', (req: any, res: any) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, user: any) => {
            if (err) return res.sendStatus(403)
            const accessToken = generateAccessToken({ name: user.name })
            res.json({ accessToken: accessToken })
        }
    )
})

app.delete('/api/v1/logout', (req: any, res: any) => {
    refreshTokens = refreshTokens.filter(
        (token: any) => token != req.body.token
    )
    res.sendStatus(204)
})

app.listen(port, () => console.log(`listening on ${port}`))
