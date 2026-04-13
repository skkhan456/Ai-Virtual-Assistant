import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/usercontext.jsx";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";

const Customize2 = () => {

    const {userData,serverurl,backendImage,selectedImage,setUserData}=useContext(UserDataContext);
    const [assistantName,setAssistantName]=useState(userData?.assistantName || "");
    const navigate=useNavigate(); 
    const [loading,setLoading]=useState(false);

    const handleUpdateAssistant=async ()=>{
      setLoading(true);
      try { 
        let formData=new FormData();
        formData.append("assistantName",assistantName);

        if (backendImage) {
          formData.append("assistantImage", backendImage); // input image
        } else if (selectedImage && selectedImage !== "input") {
          formData.append("imageUrl", selectedImage);
        }
        let result=await axios.post(`${serverurl}/api/user/update`,formData,{withCredentials:true});
        console.log(result.data);
        setLoading(false);
        setUserData(result.data);
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log("error in updating assistant name",error);
      }
    }

  return (

    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020270] flex justify-center items-center flex-col  p-[20px] relative ">
      <IoArrowBackSharp className="absolute top-[30px] left-[30px] text-white h-[25px] w-[25px] cursor-pointer" onClick={()=>navigate("/customize")}/>
      <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white font-semi bold mb-6 sm:mb-8 md:mb-10 text-center leading-snug">
  Enter Your <span className="text-blue-300">Assistant Name</span>
</h1>
      <input
        type="text"
        placeholder="eg: shipra"
        className="w-full max-w-[600px] h-[50px] outline-none bg-transparent border-2 border-white rounded-full px-4 text-white text-[18px] placeholder-gray-300"
        onChange={(e)=>{
            setAssistantName(e.target.value);
        }}
        value={assistantName}
      />
      {assistantName.length>0 && <button className="max-w-[300px] w-full h-[50px] bg-white text-black rounded-full font-bold mt-[30px] text-[19px] cursor-pointer flex items-center justify-center" onClick={()=>{
        handleUpdateAssistant()
      }} disabled={loading}>
        {!loading?"Finally Create Your Assistant":"loading..."}
      </button>}
    </div>
  );
};

export default Customize2;
