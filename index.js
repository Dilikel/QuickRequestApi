import express from 'express'
import dotenvConfig from './config/dotenv.config.js'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 8000

connectDB()

app.use(express.json())

app.use('/auth', authRoutes)

app.listen(PORT, () => {
	console.log(`Сервер запущен`)
})
