import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const uploadOnCloudinary = async (filePath)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try{
        const uploadResult = await cloudinary.uploader
       .upload(filePath)
       User.assistantImage = uploadResult.secure_url;
        fs.unlinkSync(filePath)
        return uploadResult.secure_url;
    }catch(error){
        console.log("cloudinary error",error);
        throw error;
    }
}

export default uploadOnCloudinary;