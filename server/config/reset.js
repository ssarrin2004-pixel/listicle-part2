import './dotenv.js'
import { pool } from './database.js'
import exercises from '../data/exercises.js'

const createTable = async () => {
  const query = `
    DROP TABLE IF EXISTS exercises;

    CREATE TABLE exercises (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      muscle_group VARCHAR(50) NOT NULL,
      difficulty VARCHAR(20) NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `
  await pool.query(query)
  console.log('🎉 exercises table created')
}

const seedTable = async () => {
  for (const exercise of exercises) {
    await pool.query(
      `INSERT INTO exercises (slug, name, muscle_group, difficulty, image, description)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        exercise.slug,
        exercise.name,
        exercise.muscleGroup,
        exercise.difficulty,
        exercise.image,
        exercise.description
      ]
    )
    console.log(`✅ ${exercise.name} added`)
  }
}

const reset = async () => {
  try {
    await createTable()
    await seedTable()
  } catch (err) {
    console.error('⚠️ Error:', err.message)
  } finally {
    await pool.end()
  }
}

reset()