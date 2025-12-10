import express from 'express'
import { ObjectId } from 'mongodb'

const router = express.Router()
// POST new order
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db
    const { name, email, phone, items } = req.body
    const result = await db.collection('orders').insertOne({ name, email, phone, items, createdAt: new Date() })

    res.json({
      success: true,
      message: 'Order placed successfully',
      orderId: result.insertedId 
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save order' })
  }
})


// GET all orders in a list
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const orders = await db.collection('orders').find().toArray();
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// GET single order by ID
router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db
    const order = await db.collection('orders').findOne({ _id: new ObjectId(req.params.id) })
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch order' })
  }
})

export default router