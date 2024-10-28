import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import projectsRoutes from './routes/projectsRoutes.js'

import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

connectDB()

app.use(cors(), express.json())
app.use(authRoutes)
app.use('/projects', projectsRoutes)

app.listen(PORT, () => {
	console.log(`Сервер запущен`)
})
