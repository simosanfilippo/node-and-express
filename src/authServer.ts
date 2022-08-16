require('dotenv').config()

import express from 'express'
const app = express()
const jwt = require('jsonwebtoken')

const port = 4000

app.use(express.json())

let refreshTokens: any = []

//Authentication
app.post('/api/v1/login', (req, res) => {
    const email = req.body.email
    const user = { email: email }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
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
