import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import './config/dotenv.js'
import { pool } from './config/database.js'
import exerciseRouter from './routes/exercises.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientPath = path.join(__dirname, '../client')

const app = express()
const PORT = process.env.PORT || 3001

app.use('/api/exercises', exerciseRouter)

app.use(express.static(clientPath))

app.get('/exercises/:slug', (req, res) => {
  res.sendFile(path.join(clientPath, 'exercise.html'))
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(clientPath, '404.html'))
})

pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connected to the database'))
  .catch((err) => console.error('❌ Database connection failed:', err.message))

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})