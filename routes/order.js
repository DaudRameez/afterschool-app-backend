app.post('/orders', async (req, res ) => {
    const db = req.app.locals.db;
    const order = req.body;

    const result = await db.collection('orders').insertOne(order);

    res.json({
        success: true,
        message :"Order placed successfully",
        orderId: result.insertId
    });
});

app.get('/orders', async (req, res) => {
    const db = req.app.locals.db;
    const orders = await db.collection('orders').find().toArray();
    res.json(orders);
});
