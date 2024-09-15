import express from 'express'
import { PORT } from './config.js'

const app = express()

app.get('/', (req, res) => {
    return res.status(200).send('Home')
})

app.listen(PORT, () => {
    console.log(`photo server is running on port : ${PORT}`)
})
