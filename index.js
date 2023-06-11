const express=require('express');
const {connection} = require("./db");
const {userRouter} =require("./routes/user.router")
const {noteRouter} =require("./routes/note.router")
const cors=require("cors")
const app=express();
app.use(cors());
require("dotenv").config();
app.use(express.json());

app.use("/users",userRouter)
app.use("/notes",noteRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection

        console.log(`Running at PORT ${process.env.PORT}`)
        console.log("Connected to db")
    }catch(e){
        console.log(e)
        console.log("Something went wrong")
    }
    
})