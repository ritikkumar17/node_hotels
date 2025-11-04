const express = require('express');
const router = express.Router();

const Person = require('./../models/Person')

router.post("/",async (req,res)=>{
    try{
        // Assuming the request body contains the person data
        const data = req.body 

        // create a new Person document using Mongoose model
        const newPerson = new Person(data);

        // Save the new Person to the database
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(200).json({eroor:"Internal server error"})
    }
})

router.get("/",async(req,res)=>{
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(200).json({error:"Internal server error"})
    }
})


router.get('/:workType', async(req, res) => {
    try{
         const workType = req.params.workType; // Extract the work type from the URL parameter.
         if(workType =="chef" || workType == "manager" || workType == "waiter"){

            const response = await Person.find({work:workType});
            console.log("response fetched");
            res.status(200).json(response);
         }else{
            console.log("Invalid work type received:", workType);
            res.status(404).json({error:"Invalid work type"})
         }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
  });

  router.put('/:id', async (req,res)=>{
    try{
         const personId = req.params.id;//Extract the id from the URL parameter.
         const updatedPersonData = req.body; // Updated data for the person.

         const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, //Return the updated document
            runValidators:true, //Run Moongoose validation
         })

         if(!response){
            return res.status(404).json({error:"Person not Found"}) 
         }
         console.log('data updated successfully');
         res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Person not Found"});
    }
  })

  router.delete("/:id", async (req,res)=>{
    try{
       const personId = req.params.id //Extract the person's Id from the URL parameter.

       const response = await Person.findByIdAndDelete(personId);
       if(!response){
        return res.status(404).json({error:"Person not Found"}) 
     }
     console.log('data Deleted successfully');
         res.status(200).json({message:"person deleted successfully"})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Person not Found"});
    }
  })


  module.exports = router