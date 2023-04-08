const express = require("express");
const router = express.Router();
const Order =require("../models/Orders")

router.post('/order-data',async(req,res)=>{
    let data =req.body.order_data;
    await data.splice(0,0,{order_date:req.body.order_date})

    // if email not existing in db then create else insertMany()
    let eid =await Order.findOne({'email':req.body.email})
    console.log(eid)
    if(eid ===null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            })
            .then(()=>{
                res.json({success:true})
            })

        }catch(err){
            // console.log(err.message)
            res.send("Server Error",err.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}})
                .then(()=>{
                    res.json({success:true})
                })

        }catch(err){
            res.send("Server Error",err.message)
        }

    }

})

router.post('/myOrderData',async(req,res)=>{
    try {
        let mydata =await Order.findOne({email:req.body.email})
        res.json({orderData:mydata})
    } catch (err) {
        res.send("Server Error",err.message)
    }
})



module.exports = router;