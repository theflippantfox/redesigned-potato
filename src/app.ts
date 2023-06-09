import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import router from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 9000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/test'

mongoose.connect(DATABASE_URL)
  .then(() => { console.log('connection established') })
  .catch((error) => { console.error(error) })

app.use('/', router)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server established at http://localhost:${PORT}/`)
})
