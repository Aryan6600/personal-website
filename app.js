const express = require('express')
const path = require("path")
const app = express()
const Blog = require("./db/Schemas/Blogs")
const Product = require("./db/Schemas/Products")
const fs = require('fs')
require("dotenv").config()
app.use(express.json());
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
function saveImageFromDataUri(dataUri, fileName, outputDir = "static/uploads/images/") {
    // 1. Check for a valid Data URI format
    if (!dataUri || !dataUri.startsWith('data:')) {
        throw new Error("Invalid Data URI provided. It must start with 'data:'.");
    }

    // --- Extraction Logic ---
    
    // a. Split the string by the comma. The Base64 data is the second part.
    const parts = dataUri.split(',');
    if (parts.length !== 2) {
        throw new Error("Data URI is malformed; missing a comma separator.");
    }
    const base64Data = parts[1]; 

    // b. Extract the MIME type from the first part (e.g., 'image/png')
    const mimeSection = parts[0];
    const mimeMatch = mimeSection.match(/^data:([^;]+);base64$/);
    
    if (!mimeMatch) {
        throw new Error("Could not extract MIME type from the Data URI prefix.");
    }
    
    const mimeType = mimeMatch[1];
    
    // c. Get the file extension (e.g., 'png' from 'image/png')
    const fileExtension = mimeType.split('/')[1]; 

    // 2. Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 3. Decode the Base64 string into a binary Buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // 4. Construct the full file path
    const filePath = path.join(outputDir, `${fileName}.${fileExtension}`);

    // 5. Write the Buffer to the file system
    fs.writeFileSync(filePath, buffer);

    console.log(`✅ File saved as: ${filePath} (Type: ${mimeType})`);
    return filePath;
}

app.post('/api/upload/base64',async(req,res)=>{
    const pass = req.body.pass
    if(pass!=process.env.SECREAT) return res.json({})
    const img=req.body.image
    const fileName = saveImageFromDataUri(img,Date.now())
    res.json({"file":`${fileName}`})
})

app.listen(3000,()=>{
    console.log("Running on port 3000");
});