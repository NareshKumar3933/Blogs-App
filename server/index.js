const express = require('express');
const cors = require('cors');
const { connectDb } = require('./connection');
const BlogPost = require("./models/BlogPost");
const app = express();

const port = 5000;

//connect Database
connectDb();


//middleware
app.use(express.json());
app.use(cors()); 

//routes
//Route 1 Post the blog
app.post("/post-blogs", async (req,res)=>{
    let blogs = new BlogPost({
        title: req.body.title,
        description: req.body.description,

    });
    await blogs.save();
    res.json({ message: "Blog page saved successfully!", blogs})
});
// Route 2 Get all blogs
app.get("/get-blogs", async(req,res)=>{
    let blogs = await BlogPost.find();
    if(!blogs){
        res.status(404).json({message:'No Blog found'});
    }else{
        res.json({blogs})
    }
    
})
//Route 3 Delete the blogs
app.delete("/delete-blog/:id", async(req,res)=>{
    let blogs = await BlogPost.findByIdAndDelete(req.params.id);
    if(!blogs){
        res.status(404).json({message:'No Blog found'});
    }else{
        res.status(200).json({message:"Blog deleted successfully"});
    }
})
// Route 4 Update the blogs
app.put("/update-blog/:id", async(req,res)=>{
    let blogs = await BlogPost.findByIdAndUpdate(req.params.id);
    if(!blogs){
        res.status(404).json({message:'No Blog found'});
    }
    if(!req.body.title && !req.body.description){
        res.json({message:"Please enter title or description"});
    }else if(!req.body.title){
        blogs.description = req.body.description;
    }else if(!req.body.description){
        blogs.title = req.body.title;
    }else{
        blogs.title = req.body.title;
        blogs.description = req.body.description;
    }
    await blogs.save();
    res.status(200).json({message:'Blog Updated successfully', blogs})
}) 

//listen server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})