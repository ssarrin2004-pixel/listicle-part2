import express from 'express'
import './config/dotenv.js'
import { pool } from './config/database.js'

const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.status(200).send('<h1>Listicle server is running</h1>')
})

pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connected to the database'))
  .catch((err) => console.error('❌ Database connection failed:', err.message))

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})