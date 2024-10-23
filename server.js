const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Product = require('./models/products')





dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Mondodb is connected succesfully")
}).catch((err)=>{
    console.log("Failed to connect to db", err)
})

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Hello home")
});

// get all items 
app.get('/items', async(req, res)=>{
    const allItems = await Product.find();
    res.status(200).json(allItems)
})

// add  items
app.post('/items', async(req, res)=>{
    const data = req.body
    if(data.name == "" && data.price=="") return;

    try {
        const newItem = await Product.create(data);
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).json({message: message.error})
    }
});

// get a single item 

app.get('/items/:id', async(req, res)=>{
    try{
    const {id} = req.params
    const singleItem = await Product.findById(id)
    res.status(200).json(singleItem)
    }catch(err){
        res.status(400).json({message: message.err})
    }
})
// update item 

app.put('/items/:id', async(req, res)=>{
    const {id} = req.params
   const data = req.body

   const updatedProduct = await Product.findByIdAndUpdate(id, data)
   if(!updatedProduct){
    return res.status(400).json({message:"No product with such ID"})
   }
   res.status(200).json(updatedProduct)
})

// delete items 

app.delete('/items/:id', async(req, res)=>{
    const {id} = req.params
    const data = req.body
    const deletedItem = await Product.findByIdAndDelete(id, data)

    res.status(200).json(deletedItem)
})







const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Connected to port ${PORT} `)
})

