const express = require('express')
const path = require("path")
const app = express()
const Blog = require("./db/Schemas/Blogs")
const Product = require("./db/Schemas/Products")
const fs = require('fs')
require("dotenv").config()
const multer = require('multer')

const uploadDir = path.join('static/uploads/images');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `static/uploads/images/`); // Specifies the directory to save files
    },
    filename: (req, file, cb) => {
        // Creates a unique filename by adding a timestamp
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ 
    storage: storage ,
    imits: { fileSize: 10 * 1024 * 1024 }, // Sets a 10MB limit
});
const checkPass = async(req, res, next) => {
    if (!req.body.pass) {
        req.valid=true
        return next()
    }
    if(req.body.pass==process.env.SECREAT){
        console.log("valid user");
        req.valid=true
        next()}
    else{
        console.log("Not valid user");
        req.valid=false
        return next()
    }
};


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/static",express.static(path.join(__dirname,"static")))
app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'templates'));

app.get('/',(req,res)=>{
    res.render("index")
})

app.get('/blog',async(req,res)=>{
    try{
        const blogs = await Blog.find({tags:{$not:{$in:["Featured"]}}}).limit(10)
        const featured=await Blog.findOne({tags:{$in:["Featured"]}})
        res.render('blog',{blogs:blogs,featured})
    }catch{
        res.send("Server Error")
    }
})

app.get('/blog/:id',async(req,res)=>{
    const id = String(req.params.id)
    const blog = await Blog.findById(id)
    return res.render('blog_view',{post:blog})
})

app.get('/store',async(req,res)=>{
    try{
        const web = await Product.find({tags:{$in:["Website"]}}).limit(10)
        const app = await Product.find({tags:{$in:["Mobile"]}}).limit(10)
        const notes = await Product.find({tags:{$in:["Notes"]}}).limit(10)
        res.render('store',{web,app,notes})
    }catch{
        res.send("Server Error")
    }
})

app.get('/store/:id',async(req,res)=>{
    try{
        const productData = await Product.findById(req.params.id)
        // Simple check for out-of-stock status
        const stockStatus = productData.stock > 0 
            ? `${productData.stock} in stock` 
            : 'Out of Stock';
    
        res.render('product_view', {
            product: productData,
            stockStatus: stockStatus
        });
    }catch{
        res.send("Server Error")
    }
})

app.get('/api/blogs',async(req,res)=>{
    try{
        const n = Number(req.query.n)
        const blogs = await Blog.find({tags:{$not:{$in:["Featured"]}}}).limit(10).skip(10*n)
        res.json(blogs)
    }catch{
        res.json([])
    }
})

app.post('/api/blogs',upload.single('image'),checkPass,async(req,res)=>{
    try{
        console.log(req.body)
        const {pass,title,description,short_desc,tags}=req.body
        const file = req.file
        if (!pass || !title || !description||!short_desc||!tags||!file) {
        // Clean up the file if it exists, as the request is incomplete
            if (file) fs.unlinkSync(file.path); 
            return res.status(400).json({ message: 'Missing required fields (image, title, or pass).' });
        }
        if (!req.valid) {
        // Password failed: Delete the saved file immediately
            fs.unlinkSync(file.path); 
            console.log(`Access attempt failed. Deleted file: ${file.path}`);

            return res.status(403).json({ message: 'Invalid credentials. File upload forbidden.' });
        }
        const image = `/static/uploads/images/${req.file.filename}`
        const newblog = new Blog({title,short_desc,description,tags,image})
        await newblog.save()
        res.json(newblog)
    }catch(e){
        res.json({"msg":e})
    }
})

app.listen(3000,()=>{
    console.log("Running on port 3000");
});