import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import photoRoute from './routes/photoRoute.js'

dotenv.config()

const { DATABASE_URL, PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use('/photos', photoRoute)

app.get('/', (request, response) => {
    const message = 'Welcome to the Photos API!'
    const data = {
        sourceCode: 'https://github.com/edignot/photo-wall-backend',
    }

    return response.status(200).json({ message, data })
})

mongoose
    .connect(DATABASE_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Photo server is running on port : ${PORT}`)
        })
        console.log('Database connected')
    })
    .catch((error) => {
        console.error('Error connecting to database:', error)
        process.exit(1)
    })
