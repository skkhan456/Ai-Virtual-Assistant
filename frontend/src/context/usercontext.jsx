import { createContext, useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const serverurl = "https://virtualassistant-backend-wfqh.onrender.com";
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // const handleCurrentUser = async () => {
  //   try {
  //     const result = await axios.get(`${serverurl}/api/user/current`, {
  //       withCredentials: true,
  //     });
  //     setUserData(result.data);
  //     console.log("current user data", result.data);
  //   } catch (error) {
  //     console.log("error in fetching current user", error);
  //   }
  // };

  const handleCurrentUser = async () => {
  try {
    const result = await axios.get(`${serverurl}/api/user/current`, {
      withCredentials: true,
    });
    setUserData(result.data);
    console.log("current user data", result.data);
  } catch (error) {
    if (error.response?.status === 401) {
      // User not logged in — expected after logout
      setUserData(null);
      navigate("/signin");
    } else {
      // Only log unexpected real errors
      console.log("error in fetching current user", error);
    }
  }
};
  

  const isRequestInProgress = useRef(false);

  const getGeminiResponse = async (command) => {
    if (isRequestInProgress.current) {
      console.log("Wait... request already running");
      return;
    }
    isRequestInProgress.current  = true;

    try {
      let result = await axios.post(
        `${serverurl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true },
      );

      return result.data;
    } catch (error) {
      console.log("error in asking assistant", error);
    } finally {
      isRequestInProgress.current = false;
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverurl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
