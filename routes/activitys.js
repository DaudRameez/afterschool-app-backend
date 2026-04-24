import express from 'express'
import { ObjectId } from 'mongodb'

const router = express.Router()

// GET /api/lessons — return all lessons
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db
    const lessons = await db.collection('lessons').find({}).toArray()
    res.json(lessons)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch lessons' })
  }
})

// PUT /api/lessons/:id — update any lesson attribute (e.g. spaces)
router.put('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db
    const update = { ...req.body }
    delete update._id

    const filter = ObjectId.isValid(req.params.id)
      ? { _id: new ObjectId(req.params.id) }
      : { id: Number(req.params.id) }

    const result = await db.collection('lessons').updateOne(filter, { $set: update })
    res.json({ success: true, result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update lesson' })
  }
})

export default router
