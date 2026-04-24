import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import lessonsRoutes from './routes/activitys.js'
import orderRoutes from './routes/order.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})


const imagesDir = path.join(__dirname, 'public', 'images')
app.use('/images', express.static(imagesDir))


app.use('/images', (req, res) => {
  res.status(404).json({ error: 'Image not found' })
})

// MongoDB Atlas connection (native driver only)
let db
const client = new MongoClient(process.env.MONGODB_URI)
client.connect()
  .then(() => {
    db = client.db('afterschool')
    app.locals.db = db
    console.log('Connected to MongoDB Atlas')
  })
  .catch(err => console.error('Mongo connection error:', err))

// Routes
app.use('/api/lessons', lessonsRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => res.send('After School API is running'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
