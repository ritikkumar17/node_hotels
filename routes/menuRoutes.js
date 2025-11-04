const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");


router.post("/",async (req,res)=>{
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

router.get("/",async(req,res)=>{
    try{
         const data = await MenuItem.find();
         console.log("Menu data fetched successfully");
         res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
})

router.get("/:tastetype" ,async(req,res)=>{
    try{
        const tastetype = req.params.tastetype;
        if(tastetype == "sweet" || tastetype == "spicy"  || tastetype == "sour")
            {
               const responsed = await MenuItem.find({taste :tastetype});
               console.log("data fetched successfully");
               res.status(200).json(responsed);
            }else{
                console.log("Invalid taste type received:", tastetype);
                res.status(404).json({error:"Invalid taste type"})
            }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const menuid = req.params.id;
        const updatedData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuid,updatedData);
        
        if(!response){
            return res.status(404).json({error:"menuid not Found"}) 
         }
    
        console.log("Menu data updated successfully")
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"})
    }
})


router.delete("/:id",async(req,res)=>{
    try{
    const menuid =req.params.id;
    const response =await MenuItem.findByIdAndDelete(menuid);

    if(!response){
        return res.status(404).json({error:"Person not Found"}) 
     }

    console.log("Deleted successfully")
     res.status(200).json({message:"Menu record deleted successfully"})
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"})
    }
})

module.exports = router;
