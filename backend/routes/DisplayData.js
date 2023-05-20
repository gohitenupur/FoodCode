const express = require("express")

const router =express.Router()

router.get("/food-data",(req,res)=>{
    try{
        // console.log(global.foodData);
        console.log("ckeck data")
        res.send([global.foodData ,global.foodCategory])
        // res.json("data send")

    }catch(err){
        console.log(err.message);
        req.send("Server Error")
    }
})

module.exports =router