import express from 'express'
import dotenv from 'dotenv'

import users from './data/users.js'

import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import { handleNotFoundError } from './middleWares/errorHandler.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.use('/users', userRouter)

// app.use('/', (req, res) => {
//   res.end('Hello from server')
// })

app.use(handleNotFoundError)
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('Server is running'))
