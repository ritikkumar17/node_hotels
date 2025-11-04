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







// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require("./routes/menuRoutes")

// Use the routers
app.use('/person' , personRoutes);
app.use('/menu' , menuRoutes);

  
app.listen(3000,()=>{
    console.log("server is running")
})