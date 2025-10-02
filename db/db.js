const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.CONN_STR,{})
.then(()=>{
    console.log("Connected to mongodb")
}).catch((e)=>{console.log("Some Error Occured while connecting to mongodb",e)})

module.exports=mongoose