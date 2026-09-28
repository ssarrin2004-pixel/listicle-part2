import express from 'express'
import { getExercises, getExerciseBySlug } from '../controllers/exercises.js'

const router = express.Router()

router.get('/', getExercises)
router.get('/:slug', getExerciseBySlug)

export default router