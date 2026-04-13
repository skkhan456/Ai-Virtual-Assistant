import uploadOnCloudinary from "../config/cloudinary.js";
import generateResponse from "../gemini.js";
import User from "../models/user.js";
import moment from "moment";
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error in get current user" });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;

    if (!assistantName) {
      return res.status(400).json({ message: "Assistant name is required" });
    }

    let assistantImage;

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId, 
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in update assistant" });
  }
};


const askToAssistant=async (req,res)=>{
    const {command}=req.body;
    
    // fetching user from database by id
    const user=await User.findById(req.userId);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    if (!user.history) {
      user.history = [];
    }

    user.history.push({command});
    await user.save();
    const assistantName=user.assistantName
    const userName=user.name;
    const assistantImage=user.assistantImage;

    const response=await generateResponse(String(command),assistantName,userName);
    if (!response) {
      return res.status(500).json({ message: "Empty response from AI" });
    }

    const jsonMatch=response.match(/{[\s\S]*}/);
    if(!jsonMatch){
        return res.status(400).json({response:"sorry i can't understand your response"});
    }

    const gemResponse=JSON.parse(jsonMatch[0]);
    const type=gemResponse.type;
    switch(type){
        case "get_time":
          return res.json({
            type,
            userInput: gemResponse.userInput,
            response: `current time is ${moment().format("hh:mm A")}`
          });
        case "get_date":
          return res.json({
            type,
            userInput: gemResponse.userInput,
            response: `today's date is ${moment().format("YYYY-MM-DD")}`
          });
        case "get_day":
          return res.json({
            type,
            userInput: gemResponse.userInput,
            response: `today is ${moment().format("dddd")}`
          });
        case "get_month":
          return res.json({
            type,
            userInput: gemResponse.userInput,
            response: `current month is ${moment().format("MMMM")}`
          });
        case "calculator_open":
        case "instagram_open":
        case "facebook_open":
        case "weather_show":
        case "google_search":
        case "youtube_search":
        case "youtube_play":
        case "general":
          return res.json({
            type,
            userInput: gemResponse.userInput || command,
            response: gemResponse.response
          });
        default:
          return res.status(400).json({response:"sorry i can't understand your response"});
        
    }
    
}
export default askToAssistant;