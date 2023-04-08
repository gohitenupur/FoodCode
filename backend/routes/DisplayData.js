const express = require("express")

const router =express.Router()

router.post("/food-data",(req,res)=>{
    try{
        // console.log(global.foodData);
        res.send([global.foodData ,global.foodCategory])
    }catch(err){
        console.log(err.message);
        req.send("Server Error")
    }
})

module.exports =router