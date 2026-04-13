import React from 'react'
import { useContext } from 'react';
import { UserDataContext } from '../context/usercontext';

const Card = ({image}) => {
  const {frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage} = useContext(UserDataContext);
  return (
    <div className={`w-[70px] h-[150px] lg:w-[150px] lg:h-[250px] bg-[#090101] overflow-hidden rounded-2xl border-2 border-[#0000ff62] hover:shadow-2xl hover:shadow-blue-900 hover:border-4 hover:border-white cursor-pointer  ${selectedImage==image?"border-4 border-white   shadow-2xl shadow-blue-900 ":""}`} onClick={()=>{
      setSelectedImage(image);
      setFrontendImage(null);
      setBackendImage(null);
    }} >
      <img src={image} alt="card" className='h-full object-cover'/>
    </div>
  )
}

export default Card
