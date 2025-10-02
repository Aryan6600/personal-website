const db= require("../db")

const blogSchema = db.Schema({
    title:String,
    image:String,
    description:String,
    short_desc:String,
    views:{type:String,default:0},
    uploaded_on:{type:Date,default:Date.now},
    tags:[String]
})

const Blog = db.model('blogs',blogSchema)

module.exports=Blog