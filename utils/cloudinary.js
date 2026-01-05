const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

console.log(process.env.CLOUDINARY_API_KEY);


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            console.log("LocalFilePath is missing");
            return null;
        }
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        //file has been uploaded successfully
        console.log("File has been uploaded on cloudinary",response.url);
        return response;
    }
    catch(error){
        //remove the locally saved file because upload option failed
        console.log(error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

module.exports = uploadOnCloudinary;