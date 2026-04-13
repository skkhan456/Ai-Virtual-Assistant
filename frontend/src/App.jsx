import React, { useContext} from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx"
import SignIn from "./pages/SignIn.jsx"
import { UserDataContext } from "./context/usercontext.jsx";
import Customize from "./pages/Customize.jsx";
import Home from "./pages/Home.jsx";
import Customize2 from "./pages/Customize2.jsx";

const App = () => {
  const {serverurl,userData,setUserData}=useContext(UserDataContext);
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/customize2" element={userData? <Customize2/> : <Navigate to={"/signin"} />} />
      <Route path="/customize" element={userData? <Customize/> : <Navigate to={"/signin"} />} />
      <Route path="/signup" element={!userData?<SignUp/> : <Navigate to={"/"} /> } />
      <Route path="/signin" element={!userData?<SignIn/> : <Navigate to={"/customize"} /> } />
    </Routes>
  );
};

export default App;
