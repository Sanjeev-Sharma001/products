const express = require("express");
const mongoose = require('mongoose');
const Product = require("./products");
const userrouter = require("./routes/my");
const path = require("path");
const app = express();

app.set('view engine','ejs')
app.set('views','views')
app.use(express.json());
mongoose.connect("mongodb+srv://sanjeevayyagari:sanjeev@cluster0.po6lawx.mongodb.net/?retryWrites=true&w=majority")




app.post('/products',async(req,res)=>{
    const { productId, name, price, featured,  rating, createdAt,company} = req.body;

    const newNote = new Product({
        productId:productId,
        name:name,
        price:price,
        featured:featured,
        rating:rating,
        createdAt:createdAt,
        company:company

    });

    try {
        
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
})
app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (err) {
      res.status(500).send(err);
    }
})

app.put('/products/:id', async (req, res) => {
    // validate the request body
     
  
    try {
      // find the product by id and update its fields
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  app.delete('/products/:id', async (req, res) => {
    try {
      // find the product by id and delete it
      const product = await Product.findByIdAndDelete(req.params.productId);
      res.send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/products/featured', async (req, res) => {
    try {
      const products = await Product.find({ featured: true });
      res.send(products);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  app.get('/products/rating/:value', async (req, res) => {
    try {
    const products = await Product.find({ rating: { $lt: req.params.value } });
    res.send(products);
    } catch (err) {
    res.status(500).send(err);
    }
    });
    
    
  app.get('/products/rating/:value', async (req, res) => {
    try {
    const products = await Product.find({ rating: { $gt: req.params.value } });
    res.send(products);
    } catch (err) {
    res.status(500).send(err);
    }
    });
    
    
  
  
  
    
    
app.listen(5000, () => {
    console.log('Server listening on port 3000');
});
    
    