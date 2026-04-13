import React, { useContext, useRef } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { FaFileUpload } from "react-icons/fa";
import { UserDataContext } from "../context/usercontext.jsx";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const Customize = () => {
  const inputImage = useRef(null);

  const {
    frontendImage,
    setFrontendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(UserDataContext);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#020270] flex flex-col items-center justify-center gap-6 p-4 sm:p-6">
      <IoArrowBackSharp className="absolute top-[30px] left-[30px] text-white h-[25px] w-[25px] cursor-pointer" onClick={()=>navigate("/")}/>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold text-center">
        Select Your <span className="text-blue-300">Assistant Image</span>
      </h1>
 
      <div className="w-full max-w-[900px] flex flex-wrap justify-center gap-4 sm:gap-6">

        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div
  className={`w-[70px] h-[150px] lg:w-[150px] lg:h-[250px]
  bg-[#090101] overflow-hidden rounded-xl border-2 border-[#0000ff62] 
  hover:shadow-2xl hover:shadow-blue-900 cursor-pointer 
  hover:border-4 hover:border-white flex justify-center items-center 
  ${
    selectedImage === "input"
      ? "border-4 border-white shadow-xl shadow-blue-900"
      : ""
  }`}
  onClick={() => {
    inputImage.current.click();
    setSelectedImage("input");
  }}
>
  {!frontendImage && (
    <FaFileUpload className="text-white w-6 h-8 sm:w-8 sm:h-10" />
  )}

  {frontendImage && (
    <img
      src={frontendImage}
      alt="custom"
      className="w-full h-full object-cover"
    />
  )}
</div>

        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          className="hidden"
          onChange={handleImage}
        />
      </div>

      {selectedImage && (
        <button
          className="w-full max-w-[250px] h-[50px] bg-white text-black rounded-full font-bold text-base sm:text-lg cursor-pointer hover:scale-105 transition"
          onClick={() => {
            navigate("/customize2");
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
