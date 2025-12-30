const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.middleware');
const uploadOnCloudinary = require('../utils/cloudinary');
const fileModel = require('../models/file.model');
const fs = require('fs');

router.get('/home',(req,res)=>{
    res.render("index");
});

router.get('/upload',(req,res)=>{
    res.render("upload");
})

module.exports = router;
