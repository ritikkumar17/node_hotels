const express = require("express")
const app = express();
const db= require('./db')
const Person = require('./models/Person')
const MenuItem = require("./models/MenuItem");




const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

app.get("/",function(req,res){
    res.send('welcome to my hotel... how i can help you?')
})






app.post("/menu",async (req,res)=>{
    try{
        const data = req.body;
        const newMenu = new MenuItem(data)
        const response =  await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
})


app.get("/menu",async(req,res)=>{
    try{
         const data = await MenuItem.find();
         console.log("Menu data fetched successfully");
         res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
})

// Import the router files
const personRoutes = require('./routes/personRoutes');

// Use the routers
app.use('/person' , personRoutes);
  
app.listen(3000,()=>{
    console.log("server is running")
})