const express = require("express")
const app = express();
const db= require('./db')
require('dotenv').config();
const Person = require('./models/Person')
const MenuItem = require("./models/MenuItem");




const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const PORT = process.env.PORT || 3000

app.get("/",function(req,res){
    res.send('welcome to my hotel... how i can help you?')
})







// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require("./routes/menuRoutes")

// Use the routers
app.use('/person' , personRoutes);
app.use('/menu' , menuRoutes);



app.listen(PORT,()=>{
    console.log("server is running")
})