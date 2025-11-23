app.post("/api/cart/add", async (req, res) => {  
    const { userID, productID, quantity } = req.body;

    const item = await cart.create({ userID, productID, quantity });
    res.json({ success: true, item }); 
});

app.get("/api/cart/:userId", async (req, res) => { 
    const items = await cart.find({ userId: req.params.userId }) 
    .populate("productId");
    res.json(items); 
}); 

app.delete("/api/cart/remove/:id", async (req, res) => { 
    await cart.findByIdAndDelete(req.params.id); 
    res.json({ success: true });
}); 