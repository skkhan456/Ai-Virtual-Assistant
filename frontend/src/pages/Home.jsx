// import React, { useContext, useEffect, useRef, useState } from "react";
// import { UserDataContext } from "../context/usercontext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import img1 from "../assets/user.gif";
// import img2 from "../assets/ai.gif";

// const Home = () => {
//   const { userData, serverurl, setUserData, getGeminiResponse } =
//     useContext(UserDataContext);
//   const navigate = useNavigate();

//   const [listening, setListening] = useState(false);
//   const isSpeakingRef = useRef(false); // handles when assitant speaking
//   const recognitionRef = useRef(null);
//   const synth = window.speechSynthesis;
//   const [userText, setUserText] = useState("");
//   const [aiText, setAiText] = useState("");

//   const isRecognizingRef = useRef(false);

//   const handleLogOut = async () => {
//     try {
//       await axios.post(
//         `${serverurl}/api/auth/logout`,
//         {},
//         { withCredentials: true },
//       );

//       setUserData(null);
//       navigate("/signin");
//     } catch (error) {
//       console.log("Logout failed:", error);
//     }
//   };

  //   const handleCommand = (data) => {
  //     const { type, userInput, response } = data;

  //     if (type === "google_search") {
  //       const query = encodeURIComponent(userInput);
  //       window.open(`https://www.google.com/search?q=${query}`, "_blank");
  //     }
  //     if (type === "youtube_search" ) {
  //       const query = encodeURIComponent(userInput);
  //       window.open(
  //         `https://www.youtube.com/results?search_query=${query}`,
  //         "_blank",
  //       );
  //     }

  //     if (type === "youtube_play") {
  //   const query = encodeURIComponent(userInput);
  //   window.open(
  //     `https://www.youtube.com/results?search_query=${query}&autoplay=1`,
  //     "_blank"
  //   );
  // }

  //     if (type === "instagram_open") {
  //       const query = encodeURIComponent(userInput);
  //       window.open(`https://www.instagram.com/`, "_blank");
  //     }
  //     if (type === "facebook_open") {
  //       window.open(`https://www.facebook.com/`, "_blank");
  //     }
  //     if (type === "calculator_open") {
  //       window.open(`https://www.google.com/search?q=calculation`, "_blank");
  //     }
  //     if (type === "weather_show") {
  //       const query = encodeURIComponent(userInput);
  //       window.open(`https://www.google.com/search?q=weather`, "_blank");
  //     }
  //   };

  //   const recognitionStart=()=>{
  //     recognitionRef.current?.start();
  //     setListening(true);

  //   }

//   // const speak = (text) => {
//   //   const utterance = new SpeechSynthesisUtterance(text);
//   //   utterance.lang="hi-IN";
//   //   const voices=window.speechSynthesis.getVoices();
//   //   const hindiVoice=voices.find(v=>v.lang==="hi-IN");
//   //   if(hindiVoice){
//   //     utterance.voice=hindiVoice;
//   //   }
//   //   isSpeakingRef.current = true;
//   //   utterance.onend = () => {

//   //     isSpeakingRef.current = false;
//   //     setAiText("");
//   //     speechRecognize();
//   //   };
//   //   synth.speak(utterance);
//   // };

//   // const speechRecognize = async () => {
//   //   const SpeechRecognition =
//   //     window.SpeechRecognition || window.webkitSpeechRecognition;

//   //   const recognition = new SpeechRecognition();
//   //   recognition.continuous = true;
//   //   recognition.lang = "en-US";

//   //   recognitionRef.current = recognition;

//   //   const safeRecognition = () => {
//   //     if (!isSpeakingRef.current && !isRecognizingRef.current) {
//   //       try {
//   //         recognition.start();
//   //         console.log("Speech recognition started");
//   //       } catch (error) {
//   //         if (error.name !== "InvalidStateError") {
//   //           console.error("Speech recognition error:", error);
//   //         }
//   //       }
//   //     }
//   //   };

//   //   recognition.onstart = () => {
//   //     setListening(true);
//   //     isRecognizingRef.current = true;
//   //   };

//   //   recognition.onend = () => {
//   //     setListening(false);
//   //     isRecognizingRef.current = false;

//   //     if (!isSpeakingRef.current) {
//   //       setTimeout(() => {
//   //         safeRecognition();
//   //       }, 1000);
//   //     }
//   //   };

//   //   recognition.onerror = (event) => {
//   //     console.warn("Speech recognition error:", event.error);
//   //     setListening(false);
//   //     isRecognizingRef.current = false;

//   //     if (event.error !== "aborted" && !isSpeakingRef.current) {
//   //       setTimeout(() => {
//   //         safeRecognition();
//   //       }, 1000);
//   //     }
//   //   };

//   //     recognition.onresult = async (event) => {
//   //       const transcript =
//   //         event.results[event.results.length - 1][0].transcript.trim();
//   //       setUserText(transcript);
//   //       if (
//   //         transcript
//   //           .toLowerCase()
//   //           .includes(userData.user.assistantName.toLowerCase())
//   //       ) {
//   //         recognition.stop();
//   //         setListening(false);
//   //         isRecognizingRef.current=false;
//   //         let data = await getGeminiResponse(transcript);
//   //         if (!data) {
//   //           console.log("No response received");
//   //           return;
//   //         }
//   //         console.log(data);
//   //         console.log(data.response);
//   //         setAiText(data.response);
//   //         setUserText("");
//   //         speak(data.response);
//   //         handleCommand(data);
//   //       }
//   //     }

//   //     const fallback=setInterval(() => {
//   //       if (!isSpeakingRef.current && !isRecognizingRef.current) {
//   //         safeRecognition();
//   //       }
//   //     },10000)

//   //     safeRecognition();
//   //     return ()=>{
//   //       recognition.stop();
//   //       setListening(false);
//   //       isRecognizingRef.current = false;
//   //       clearInterval(fallback);
//   //     }
//   // };

//   // useEffect(() => {
//   //   if (userData) {
//   //     speechRecognize();
//   //   }
//   // }, [userData]);

//   const startRecognition = () => {
//     if (!isSpeakingRef.current && !isRecognizingRef.current) {
//       try {
//         recognitionRef.current?.start();
//         console.log("Recognition requested to start");
//       } catch (error) {
//         if (error.name !== "InvalidStateError") {
//           console.error("Start error:", error);
//         }
//       }
//     }
//   };

//   const speak = (text) => {
//     const utterence = new SpeechSynthesisUtterance(text);
//     utterence.lang = "hi-IN";
//     const voices = window.speechSynthesis.getVoices();
//     const hindiVoice = voices.find((v) => v.lang === "hi-IN");
//     if (hindiVoice) {
//       utterence.voice = hindiVoice;
//     }

//     isSpeakingRef.current = true;
//     utterence.onend = () => {
//       setAiText("");
//       isSpeakingRef.current = false;
//       setTimeout(() => {
//         startRecognition(); // ⏳ Delay se race condition avoid hoti hai
//       }, 800);
//     };
//     synth.cancel(); // 🛑 pehle se koi speech ho to band karo
//     synth.speak(utterence);
//   };

//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;
//     speak(response);
//     if (type === "google_search") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }
//     if (type === "calculator_open") {
//       window.open(`https://www.google.com/search?q=calculator`, "_blank");
//     }
//     if (type === "instagram_open") {
//       window.open(`https://www.instagram.com/`, "_blank");
//     }
//     if (type === "facebook_open") {
//       window.open(`https://www.facebook.com/`, "_blank");
//     }
//     if (type === "weather_show") {
//       window.open(`https://www.google.com/search?q=weather`, "_blank");
//     }

//     if (type === "youtube_search" || type === "youtube_play") {
//       const query = encodeURIComponent(userInput);
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank",
//       );
//     }
//   };

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.lang = "en-US";
//     recognition.interimResults = false;

//     recognitionRef.current = recognition;

//     let isMounted = true; // flag to avoid setState on unmounted component

//     // Start recognition after 1 second delay only if component still mounted
//     const startTimeout = setTimeout(() => {
//       if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
//         try {
//           recognition.start();
//           console.log("Recognition requested to start");
//         } catch (e) {
//           if (e.name !== "InvalidStateError") {
//             console.error(e);
//           }
//         }
//       }
//     }, 1000);

//     recognition.onstart = () => {
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend = () => {
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (isMounted && !isSpeakingRef.current) {
//         setTimeout(() => {
//           if (isMounted) {
//             try {
//               recognition.start();
//               console.log("Recognition restarted");
//             } catch (e) {
//               if (e.name !== "InvalidStateError") console.error(e);
//             }
//           }
//         }, 1000);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.warn("Recognition error:", event.error);
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
//         setTimeout(() => {
//           if (isMounted) {
//             try {
//               recognition.start();
//               console.log("Recognition restarted after error");
//             } catch (e) {
//               if (e.name !== "InvalidStateError") console.error(e);
//             }
//           }
//         }, 1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim();
//       if (
//         transcript
//   .toLowerCase()
//   .includes(userData?.user?.assistantName?.toLowerCase())
//       ) {
//         setAiText("");
//         setUserText(transcript);
//         recognition.stop();
//         isRecognizingRef.current = false;
//         setListening(false);
//         const data = await getGeminiResponse(transcript);
//         setAiText(data.response);
//         handleCommand(data);
//         setUserText("");
//       }
//     };

//     // const greeting = new SpeechSynthesisUtterance(
//     //   `Hello ${userData?.user?.name}, what can I help you with?`,
//     // );
//     // greeting.lang = "hi-IN";

//     // window.speechSynthesis.speak(greeting);

//     return () => {
//       isMounted = false;
//       clearTimeout(startTimeout);
//       recognition.stop();
//       setListening(false);
//       isRecognizingRef.current = false;
//     };
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-t from-black to-[#020270] flex flex-col items-center justify-center px-4 py-6 relative">
//       {/* Top Buttons */}
//       <div className="absolute top-4 right-4 flex flex-col gap-2 w-[120px] sm:w-[160px] md:w-[200px]">
//         <button
//           className="w-full h-[32px] sm:h-[36px] md:h-[40px] bg-white text-black rounded-full font-semibold text-xs sm:text-sm md:text-lg cursor-pointer hover:scale-105 transition"
//           onClick={handleLogOut}
//         >
//           Logout
//         </button>

//         <button
//           className="w-full h-[32px] sm:h-[36px] md:h-[40px] bg-white text-black rounded-full font-semibold text-xs sm:text-sm md:text-lg cursor-pointer hover:scale-105 transition"
//           onClick={() => navigate("/customize")}
//         >
//           Customize
//         </button>
//       </div>

//       {/* Assistant Image */}
//       <div className="w-full flex justify-center items-center mt-8 sm:mt-6">
//         <img
//           src={userData?.user?.assistantImage}
//           alt="Assistant"
//           className="w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 lg:w-64 lg:h-80 object-cover rounded-2xl shadow-xl"
//         />
//       </div>

//       <p className="text-white text-base sm:text-lg md:text-2xl mt-5 text-center font-medium">
//         I am {userData?.user?.assistantName}
//       </p>

//       <div className="mt-5 flex justify-center">
//         {!aiText ? (
//           <img
//             src={img1}
//             alt="User"
//             className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain scale-110 sm:scale-100 mix-blend-screen"
//           />
//         ) : (
//           <img
//             src={img2}
//             alt="Assistant"
//             className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain scale-110 sm:scale-100 mix-blend-screen"
//           />
//         )}
//       </div>

//       <h1 className="mt-3 text-[16px] sm:text-[18px] md:text-[22px] font-bold text-white flex flex-wrap justify-center items-center text-center px-2">
//         {userText ? userText : aiText ? aiText : null}
//       </h1>
//     </div>
//   );
// };

// export default Home;


import React, { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../context/usercontext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "../assets/user.gif";
import img2 from "../assets/ai.gif";

const Home = () => {
  const { userData, serverurl, setUserData, getGeminiResponse } =
    useContext(UserDataContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Fix: history is inside userData.user
  const history = userData?.user?.history || [];

  const isRecognizingRef = useRef(false);

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${serverurl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  // const handleCommand = (data) => {
  //   const { type, userInput } = data;

  //   if (type === "google_search") {
  //     window.open(
  //       `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
  //       "_blank"
  //     );
  //   }
  //   if (type === "youtube_search") {
  //     window.open(
  //       `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
  //       "_blank",
  //     );
  //   }
  //   if (type === "youtube_play") {
  //     window.open(
  //       `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
  //       "_blank"
  //     );
  //   }
  //   if (type === "instagram_open") {
  //     window.open(`https://www.instagram.com/`, "_blank");
  //   }
  //   if (type === "facebook_open") {
  //     window.open(`https://www.facebook.com/`, "_blank");
  //   }
  //   if (type === "calculator_open") {
  //     window.open(`https://www.google.com/search?q=calculation`, "_blank");
  //   }
  //   if (type === "weather_show") {
  //     window.open(`https://www.google.com/search?q=weather`, "_blank");
  //   }
  //   if (type === "open_github") {
  //     window.open("https://www.github.com", "_blank");
  //   }
  //   if (type === "open_linkedin") {
  //     window.open("https://www.linkedin.com", "_blank");
  //   }
  //   if (type === "open_whatsapp") {
  //     window.open("https://web.whatsapp.com", "_blank");
  //   }
  // };

  // const speak = (text) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "hi-IN";

  //   const voices = window.speechSynthesis.getVoices();
  //   const hindiVoice = voices.find((v) => v.lang === "hi-IN");
  //   if (hindiVoice) utterance.voice = hindiVoice;

  //   isSpeakingRef.current = true;

  //   utterance.onend = () => {
  //     isSpeakingRef.current = false;
  //     setAiText("");
  //     setTimeout(() => {
  //       speechRecognize();
  //     }, 800);
  //   }
  //   synth.cancel(); // Stop any ongoing speech before speaking new text
  //   synth.speak(utterance);
  // };

  // const speechRecognize = () => {
  //   const SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;

  //   if (!SpeechRecognition) {
  //     console.log("Speech Recognition not supported");
  //     return;
  //   }

  //   // ✅ reuse instance instead of creating again
  //   if (!recognitionRef.current) {
  //     recognitionRef.current = new SpeechRecognition();
  //   }

  //   const recognition = recognitionRef.current;

  //   recognition.continuous = true;
  //   recognition.lang = "en-US";
  //   recognition.interimResults = false;

  //   const safeStart = () => {
  //     if (!isSpeakingRef.current && !isRecognizingRef.current) {
  //       try {
  //         recognition.start();
  //       } catch (err) {
  //         // 🔴 prevent crash
  //         console.log("Start error:", err.message);
  //       }
  //     }
  //   };

  //   recognition.onstart = () => {
  //     setListening(true);
  //     isRecognizingRef.current = true;
  //   };

  //   recognition.onend = () => {
  //     setListening(false);
  //     isRecognizingRef.current = false;

  //     if (!isSpeakingRef.current) {
  //       setTimeout(() => {
  //         safeStart();
  //       }, 1500); // increased delay for stability
  //     }
  //   };

  //   recognition.onerror = (event) => {
  //     console.log("Speech Error:", event.error);

  //     if (event.error === "aborted") {
  //       isRecognizingRef.current = false;
  //       setListening(false);
  //       return;
  //     }

  //     if (event.error === "not-allowed") {
  //       console.log("Mic permission denied");
  //       return;
  //     }

  //     setTimeout(() => {
  //       safeStart();
  //     }, 1500);
  //   };

  //   recognition.onresult = async (event) => {
  //     const transcript =
  //       event.results[event.results.length - 1][0].transcript.trim();

  //     setUserText(transcript);

  //     if (
  //       transcript
  //         .toLowerCase()
  //         .includes(userData.user.assistantName.toLowerCase())
  //     ) {
  //       recognition.stop();
  //       isRecognizingRef.current = false;
  //       setListening(false);

  //       let data = await getGeminiResponse(transcript);
  //       if (!data) return;

  //       setAiText(data.response);
  //       setUserText("");

  //       speak(data.response);
  //       handleCommand(data);
  //     }
  //   };

  //   safeStart();
  // };
  // useEffect(() => {
  //   if (userData) speechRecognize();

  //   const handleResize = () => {
  //     if (window.innerWidth >= 768) {
  //       setIsSidebarOpen(true);
  //     } else {
  //       setIsSidebarOpen(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, [userData]);

  // const handleCommand = (data) => {
  //   const { type, userInput } = data;

  //   if (type === "google_search") {
  //     window.open(
  //       `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
  //       "_blank"
  //     );
  //   }

  //   if (type === "youtube_search") {
  //     window.open(
  //       `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
  //       "_blank"
  //     );
  //   }

  //   // 🔥 direct play (best possible without API)
  //   if (type === "youtube_play") {
  //     window.open(
  //       `https://www.youtube.com/results?search_query=${encodeURIComponent(
  //         userInput
  //       )}&autoplay=1`,
  //       "_blank"
  //     );
  //   }

  //   if (type === "instagram_open") {
  //     window.open(`https://www.instagram.com/`, "_blank");
  //   }

  //   if (type === "facebook_open") {
  //     window.open(`https://www.facebook.com/`, "_blank");
  //   }

  //   if (type === "calculator_open") {
  //     window.open(`https://www.google.com/search?q=calculator`, "_blank");
  //   }

  //   if (type === "weather_show") {
  //     window.open(`https://www.google.com/search?q=weather`, "_blank");
  //   }

  //   if (type === "open_github") {
  //     window.open("https://www.github.com", "_blank");
  //   }

  //   if (type === "open_linkedin") {
  //     window.open("https://www.linkedin.com", "_blank");
  //   }

  //   if (type === "open_whatsapp") {
  //     window.open("https://web.whatsapp.com", "_blank");
  //   }
  // };


  const handleCommand = (data) => {
      const { type, userInput, response } = data;
      console.log("handleCommand called:", data);

      if (type === "google_search") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
      }
      if (type === "youtube_search" ) {
        const query = encodeURIComponent(userInput);
        window.open(
          `https://www.youtube.com/results?search_query=${query}`,
          "_blank",
        );
      }

      if (type === "youtube_play") {
    const query = encodeURIComponent(userInput);
    window.open(
      `https://www.youtube.com/results?search_query=${query}&autoplay=1`,
      "_blank"
    );
  }

      if (type === "instagram_open") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.instagram.com/`, "_blank");
      }
      if (type === "facebook_open") {
        window.open(`https://www.facebook.com/`, "_blank");
      }
      if (type === "calculator_open") {
        window.open(`https://www.google.com/search?q=calculation`, "_blank");
      }
      if (type === "weather_show") {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.google.com/search?q=weather`, "_blank");
      }
    };

  
  // const speak = (text) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "hi-IN";

  //   const voices = window.speechSynthesis.getVoices();
  //   const hindiVoice = voices.find((v) => v.lang === "hi-IN");
  //   if (hindiVoice) utterance.voice = hindiVoice;

  //   isSpeakingRef.current = true;

  //   utterance.onend = () => {
  //     isSpeakingRef.current = false;
  //     setAiText("");

  //     setTimeout(() => {
  //       try {
  //         recognitionRef.current?.start();
  //       } catch (e) {
  //         console.log("Restart error:", e.message);
  //       }
  //     }, 1000);
  //   };

  //   window.speechSynthesis.cancel();
  //   window.speechSynthesis.speak(utterance);
  // };

  // const speechRecognize = () => {
  //   const SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;

  //   if (!SpeechRecognition) {
  //     console.log("Speech Recognition not supported");
  //     return;
  //   }

  //   if (!recognitionRef.current) {
  //     recognitionRef.current = new SpeechRecognition();
  //   }

  //   const recognition = recognitionRef.current;

  //   recognition.continuous = true;
  //   recognition.lang = "en-US";
  //   recognition.interimResults = false;

  //   let isMounted = true;

  //   const safeStart = () => {
  //     if (!isSpeakingRef.current && !isRecognizingRef.current && isMounted) {
  //       try {
  //         recognition.start();
  //       } catch (err) {
          
  //       }
  //     }
  //   };

  //   recognition.onstart = () => {
  //     if (!isMounted) return;
  //     setListening(true);
  //     isRecognizingRef.current = true;
  //   };

  //   recognition.onend = () => {
  //     if (!isMounted) return;

  //     setListening(false);
  //     isRecognizingRef.current = false;

  //     if (!isSpeakingRef.current) {
  //       setTimeout(() => safeStart(), 1200);
  //     }
  //   };

  //   recognition.onerror = (event) => {
  //     if (!isMounted) return;

  //     console.log("Speech Error:", event.error);

  //     if (event.error === "aborted" || event.error === "no-speech") return;

  //     if (event.error === "not-allowed") {
  //       console.log("Mic permission denied");
  //       return;
  //     }

  //     setTimeout(() => safeStart(), 1500);
  //   };

  //   recognition.onresult = async (event) => {
  //     if (!isMounted) return;

  //     const transcript =
  //       event.results[event.results.length - 1][0].transcript.trim();

  //     setUserText(transcript);

  //     if (
  //       transcript
  //         .toLowerCase()
  //         .includes(userData?.user?.assistantName?.toLowerCase())
  //     ) {
  //       try {
  //         recognition.stop();
  //       } catch (e) {
  //         console.log("Stop error:", e.message);
  //       }

  //       isRecognizingRef.current = false;
  //       setListening(false);

  //       const data = await getGeminiResponse(transcript);
  //       if (!data) return;

  //       setAiText(data.response);
  //       setUserText("");

  //       speak(data.response);
  //       handleCommand(data);
  //     }
  //   };

  //   safeStart();

  //   return () => {
  //     isMounted = false;

  //     try {
  //       recognition.abort();
  //     } catch (e) {}

  //     setListening(false);
  //     isRecognizingRef.current = false;
  //   };
  // };

 
  // useEffect(() => {
  //   let cleanup;

  //   if (userData && !recognitionRef.current) {
  //     cleanup = speechRecognize(); // ✅ run once
  //   }

  //   const handleResize = () => {
  //     setIsSidebarOpen(window.innerWidth >= 768);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     if (cleanup) cleanup();
  //   };
  // }, [userData]);

  const safeStartRef = useRef(null);
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    // Voices may not be loaded yet — use onvoiceschanged or retry
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) utterance.voice = hindiVoice;

    isSpeakingRef.current = true;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setAiText("");
      // ✅ Don't restart here — let recognition.onend handle it
      // ✅ Just wait a moment then start safely
      setTimeout(() => {
        safeStartRef.current?.();
      }, 800);
    };

    // ✅ Stop recognition BEFORE speaking to avoid aborted conflict
    try {
      recognitionRef.current?.stop();
    } catch (e) {}

    setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }, 300); // ✅ Small delay to let recognition fully stop
  };

  const speechRecognize = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      return;
    }

    // ✅ Always create a fresh instance
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    let isMounted = true;
    let restartTimer = null;

    const safeStart = () => {
      if (!isMounted) return;
      if (isSpeakingRef.current) return; // ✅ Block if AI is speaking
      if (isRecognizingRef.current) return; // ✅ Block if already running

      clearTimeout(restartTimer);
      restartTimer = setTimeout(() => {
        if (!isMounted || isSpeakingRef.current || isRecognizingRef.current)
          return;
        try {
          recognition.start();
        } catch (err) {
          console.log("Start error:", err.message);
        }
      }, 100); // ✅ Small debounce prevents rapid-fire starts
    };

    // ✅ Expose safeStart so speak() can call it
    safeStartRef.current = safeStart;

    recognition.onstart = () => {
      if (!isMounted) return;
      console.log("✅ Recognition STARTED");
      setListening(true);
      isRecognizingRef.current = true;
    };

    recognition.onend = () => {
      if (!isMounted) return;
      console.log("🔴 Recognition ENDED, isSpeaking:", isSpeakingRef.current);

      setListening(false);
      isRecognizingRef.current = false;

      // ✅ Only restart if AI is NOT speaking
      if (!isSpeakingRef.current) {
        safeStart();
      }
    };

    recognition.onerror = (event) => {
      if (!isMounted) return;

      console.log("❌ Error type:", event.error);
      console.log("❌ Error message:", event.message);

      // ✅ aborted/no-speech are non-fatal — just restart
      if (event.error === "aborted" || event.error === "no-speech") {
        isRecognizingRef.current = false;
        if (!isSpeakingRef.current) safeStart();
        return;
      }

      if (event.error === "not-allowed") {
        console.log("Mic permission denied");
        return;
      }

      isRecognizingRef.current = false;
      safeStart();
    };

    recognition.onresult = async (event) => {
      if (!isMounted) return;

      console.log("🎤 Result fired, total results:", event.results.length);
      console.log(
        "🎤 Last transcript:",
        event.results[event.results.length - 1][0].transcript,
      );

      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();

      setUserText(transcript);
      console.log("Transcript received:", transcript);

      if (
        transcript
          .toLowerCase()
          .includes(userData?.user?.assistantName?.toLowerCase())
      ) {
        // ✅ Set speaking flag BEFORE stopping recognition
        isSpeakingRef.current = true;

        try {
          recognition.stop();
        } catch (e) {
          console.log("Stop error:", e.message);
        }

        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript);
        if (!data) {
          isSpeakingRef.current = false; // ✅ Reset if no response
          safeStartRef.current?.();
          return;
        }

        setAiText(data.response);
        setUserText("");

        speak(data.response);
        handleCommand(data);
      }
    };

    safeStart();

    return () => {
      isMounted = false;
      clearTimeout(restartTimer);
      safeStartRef.current = null;

      try {
        recognition.abort();
      } catch (e) {}

      setListening(false);
      isRecognizingRef.current = false;
    };
  };

  useEffect(() => {
    if (!userData) return;

    const cleanup = speechRecognize(); // ✅ Always initialize fresh

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanup?.();
    };
  }, [userData]); // ✅ Removed recognitionRef.current check — handled inside
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-t from-black to-[#020270]">

      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 md:w-80 bg-gradient-to-b from-[#141e30] to-[#243b55] text-white p-4 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition duration-300 z-50 shadow-2xl`}
      >
        <h2 className="text-xl font-bold mb-4">Menu</h2>

        <button
          className="w-full mb-2 bg-white text-black rounded-full py-2 cursor-pointer"
          onClick={handleLogOut}
        >
          Logout
        </button>

        <button
          className="w-full mb-4 bg-white text-black rounded-full py-2 cursor-pointer"
          onClick={() => navigate("/customize")}
        >
          Customize
        </button>

        <h3 className="text-lg font-semibold mb-2">History</h3>

        <div className="overflow-y-auto h-[calc(100vh-180px)] pr-2">
          {!history || history.length === 0 ? (
            <p className="text-sm opacity-70">No history available</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="bg-white/10 p-3 rounded-lg mb-2">
                <p className="text-sm">🧑 {item.command}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        className="absolute top-4 right-4 z-50 bg-white/90 px-3 py-1 rounded-full cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 text-white">
        <div className="w-full flex justify-center items-center mt-8 sm:mt-6">
          <img
            src={userData?.user?.assistantImage}
            alt="Assistant"
            className="w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 lg:w-64 lg:h-80 object-cover rounded-2xl shadow-xl"
          />
        </div>

        <p className="text-xl mt-5 font-medium">
          I am {userData?.user?.assistantName}
        </p>

        <div className="mt-5 flex justify-center">
          {!aiText ? (
            <img
              src={img1}
              alt="User"
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain mix-blend-screen"
            />
          ) : (
            <img
              src={img2}
              alt="Assistant"
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain mix-blend-screen"
            />
          )}
        </div>

        <h1 className="mt-3 text-xl font-bold text-center max-w-xl">
          {userText || aiText}
        </h1>
      </div>
    </div>
  );
};

export default Home;

