import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

connectDB()

app.use(cors(),
	express.json())
app.use(authRoutes)

app.listen(PORT, () => {
	console.log(`Сервер запущен`)
})
