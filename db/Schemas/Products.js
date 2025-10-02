const db= require("../db")

const productSchema = db.Schema({
    title:String,
    image:String,
    description:String,
    short_desc:String,
    stock:{type:Number,default:10000},
    features:[String],
    price:Number,
    rating:String,
    views:String,
    author:String,
    extra_links:[String],
    uploaded_on:String,
    target_link:String,
    tags:[String]
})

const Product = db.model('products',productSchema)

module.exports=Product