import express from 'express'
import { ObjectId } from 'mongodb'

const router = express.Router()

// GET all activities
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db
    const lessons = await db.collection('activities').find({}).toArray()
    res.json(lessons) // this should return the array of lessons
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch lessons' })
  }
})


// PUT update lesson spaces
router.put('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db
    const { spaces } = req.body
    const result = await db.collection('activities').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { spaces } }
    )
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update lesson' })
  }
})

export default router
