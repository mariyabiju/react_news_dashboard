const express= require('express')
const mongoose=require('mongoose')
const cors= require('cors')
require("dotenv").config()
const app= express()
app.use(cors());
app.use(express.json())

const authRoutes=require('./routes/authRoutes')
const taskRoutes=require('./routes/taskRoutes')

app.use('/api/auth',authRoutes)
app.use('/api/task',taskRoutes)

mongoose.connect().then(()=>{
    app.listen(3000,()=>{console.log("Server running on port 3000")})
}).catch((err)=>console.log(err))