import express from 'express'

const router = express.Router()

// POST /api/orders — save a new order
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db
    const { name, phone, lessonIds, numberOfSpaces } = req.body

    if (!name || !phone || !Array.isArray(lessonIds) || lessonIds.length === 0) {
      return res.status(400).json({ error: 'Invalid order payload' })
    }

    const result = await db.collection('orders').insertOne({
      name,
      phone,
      lessonIds,
      numberOfSpaces: Number(numberOfSpaces) || lessonIds.length,
      createdAt: new Date()
    })

    res.json({ success: true, orderId: result.insertedId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save order' })
  }
})

// GET /api/orders — list all orders (for testing)
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db
    const orders = await db.collection('orders').find().toArray()
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

export default router
