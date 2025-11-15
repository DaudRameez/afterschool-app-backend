import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'
import lessonsRoutes from './routes/activitys.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI)
let db

client.connect()
.then(() => { 
    db = client.db('afterschool')
    app.locals.db = db 
    console.log('Connected to MongoDB')
})
.catch(err => console.error(err))

//Middleware logger 
app.use(( req, res, next ) => { 
    console.log(`${req.method} ${req.url}`)
    next() 
})

//Routes 
app.use('/api/lessons', lessonsRoutes)

//Start Server 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('server running on port ${PORT}')) 
