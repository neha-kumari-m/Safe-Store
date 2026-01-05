const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const upload = require('../middlewares/multer.middleware');
const uploadOnCloudinary = require('../utils/cloudinary');
const fileModel = require('../models/file.model');
const fs = require('fs');

router.get('/index',(req,res)=>{
    res.render("index");
});

router.get('/home',authMiddleware, (req,res)=>{
    res.render("home");
});

router.post('/upload',authMiddleware, upload.single('file'),async (req,res) => {
    try{
        if(!req.file){
            return res.status(400).json({message: "No file was uploaded"});
        }
        //uploading on cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        //If no response 
        if(!cloudinaryResponse){
            return res.status(400).json({message: "Cloudinary upload failed"});
        }
        //Upload is successful so store the file info in database
        const newFile = await fileModel.create({
            path:cloudinaryResponse.secure_url,
            originalname:req.file.originalname,
            user:req.user.userId
        })
        //delete the locally saved file
        try{
            fs.unlinkSync(req.file.path);
        }
        catch(err){
            console.log("local file delete failed ", err.message);
        }
        //return a response to user
        return res.status(201).json({
            message: "File uploaded successfully",
            file: newFile,
            fileId: newFile._id
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
});

router.get('/view',authMiddleware,async (req,res) => {
    try{
        const userFiles = await fileModel.find({
            user:req.user.userId
        });
        res.render("files",{files:userFiles});
    }
    catch(err){
        res.status(500).json({
            message:'Server Error'
        })
    }
});

module.exports = router;
