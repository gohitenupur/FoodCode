const express = require("express")
require("dotenv").config();
const app =express()
const port =process.env.PORT
const mongoDB=require("./db");
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

// app.get("/",(req,res)=>{
//     res.send('hello world')
// })
app.use(express.json());
app.use('/api',require("./routes/UserRoutes"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderRoutes"))

app.listen(port,()=>{
    console.log(`Example app listioning on port ${port}`)
})
