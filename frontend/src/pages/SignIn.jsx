import React, { useState } from "react";
import bg from "../assets/authBg.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/usercontext";
import axios from "axios";
import { useContext } from "react";

const SignIn = () => {
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const { serverurl,userData,setUserData } = useContext(UserDataContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverurl}/api/auth/signin`,
        { email, password },
        { withCredentials: true },
      );
      console.log(result);
      setUserData(result.data);
      navigate("/customize");
      setLoading(false);
    } catch (error) {
      setErr(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        action=""
        className="w-[90%] h-[600px] max-w-[500px] bg-[#0000005d] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-20px p-10"
        onSubmit={handleSignIn}
      >
        <h2 className="text-white text-[30px] font-semibold mb-[50px]">
          Sing In to <span className="text-blue-500">Virtual Assistance</span>
        </h2>

        <input
          type="text"
          placeholder="Email"
          className="w-full h-[50px] text-[15px] text-white outline-none border-2 border-white rounded-full px-[15px] py-[8px] mb-[25px] bg-transparent"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <div className="w-full h-[50px] outline-none border-2 border-white rounded-full px-[15px] py-[8px] mb-[40px] bg-transparent text-[15px] text-white relative">
          <input
            type={showpassword ? "text" : "password"}
            placeholder="password"
            className="w-full h-full outline-none bg-transparent"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {!showpassword && (
            <IoEye
              className="absolute top-[14px] right-[18px] w-[20px] h-[20px] text-[white]  cursor-pointer"
              onClick={() => setshowpassword(true)}
            />
          )}

          {showpassword && (
            <IoEyeOff
              className="absolute top-[14px] right-[18px] w-[20px] h-[20px] text-white  cursor-pointer"
              onClick={() => setshowpassword(false)}
            />
          )}
        </div>

        {err.length > 0 && (
          <p className="text-red-500 text-[14px] mb-4">*{err}</p>
        )}

        <button
          className="w-[200px] h-[50px] bg-blue-500 text-white rounded-full font-bold mb-[20px]"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-white text-[15px] ">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 px-[2px] font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
