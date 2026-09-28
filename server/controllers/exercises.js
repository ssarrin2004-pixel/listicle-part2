import { pool } from '../config/database.js'

export const getExercises = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM exercises ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getExerciseBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const results = await pool.query('SELECT * FROM exercises WHERE slug = $1', [slug])

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Exercise not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}