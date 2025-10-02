const db= require("../db")

const blogSchema = db.Schema({
    title:String,
    image:String,
    description:String,
    short_desc:String,
    views:String,
    uploaded_on:String,
    tags:[String]
})

const Blog = db.model('blogs',blogSchema)

module.exports=Blog