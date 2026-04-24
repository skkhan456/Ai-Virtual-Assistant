
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { UserDataContext } from "../context/usercontext.jsx";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import img1 from "../assets/user.gif";
// import img2 from "../assets/ai.gif";

// const Home = () => {
//   const { userData, serverurl, setUserData, getGeminiResponse } =
//     useContext(UserDataContext);
//   const navigate = useNavigate();

//   const [listening, setListening] = useState(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const synth = window.speechSynthesis;
//   const [userText, setUserText] = useState("");
//   const [aiText, setAiText] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

//   // Fix: history is inside userData.user
//   const history = userData?.user?.history || [];

//   const isRecognizingRef = useRef(false);

//   const handleLogOut = async () => {
//   try {
//     await axios.post(
//       `${serverurl}/api/auth/logout`,
//       {},
//       { withCredentials: true }
//     );

//     setUserData(null);

//     // ✅ Add these if you store anything locally
//     localStorage.removeItem("userData");   // or whatever your key is
//     localStorage.clear();                  // or clear everything
//     sessionStorage.clear();

//     navigate("/signin");
//   } catch (error) {
//     console.log("Logout failed:", error);
//   }
// };
//   // const handleCommand = (data) => {
//   //   const { type, userInput } = data;

//   //   if (type === "google_search") {
//   //     window.open(
//   //       `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
//   //       "_blank"
//   //     );
//   //   }
//   //   if (type === "youtube_search") {
//   //     window.open(
//   //       `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
//   //       "_blank",
//   //     );
//   //   }
//   //   if (type === "youtube_play") {
//   //     window.open(
//   //       `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
//   //       "_blank"
//   //     );
//   //   }
//   //   if (type === "instagram_open") {
//   //     window.open(`https://www.instagram.com/`, "_blank");
//   //   }
//   //   if (type === "facebook_open") {
//   //     window.open(`https://www.facebook.com/`, "_blank");
//   //   }
//   //   if (type === "calculator_open") {
//   //     window.open(`https://www.google.com/search?q=calculation`, "_blank");
//   //   }
//   //   if (type === "weather_show") {
//   //     window.open(`https://www.google.com/search?q=weather`, "_blank");
//   //   }
//   //   if (type === "open_github") {
//   //     window.open("https://www.github.com", "_blank");
//   //   }
//   //   if (type === "open_linkedin") {
//   //     window.open("https://www.linkedin.com", "_blank");
//   //   }
//   //   if (type === "open_whatsapp") {
//   //     window.open("https://web.whatsapp.com", "_blank");
//   //   }
//   // };


// //   const handleCommandFromTranscript = (transcript) => {
// //   const lower = transcript.toLowerCase();

// //   // ✅ Use lower directly — no cleaning needed
  
// //   if (lower.includes("instagram")) {
// //     window.open("https://www.instagram.com", "_blank");
// //     return true;
// //   }

// //   if (lower.includes("facebook")) {
// //     window.open("https://www.facebook.com", "_blank");
// //     return true;
// //   }

// //   if (lower.includes("whatsapp")) {
// //     window.open("https://web.whatsapp.com", "_blank");
// //     return true;
// //   }

// //   if (lower.includes("github")) {
// //     window.open("https://www.github.com", "_blank");
// //     return true;
// //   }

// //   if (lower.includes("linkedin")) {
// //     window.open("https://www.linkedin.com", "_blank");
// //     return true;
// //   }

// //   if (lower.includes("calculator")) {
// //     window.open("https://www.google.com/search?q=calculator", "_blank");
// //     return true;
// //   }

// //   if (lower.includes("weather")) {
// //     window.open("https://www.google.com/search?q=weather", "_blank");
// //     return true;
// //   }

// //   if (lower.includes("youtube")) {
// //     // Extract query by removing known words
// //     const query = lower
// //       .replace(userData?.user?.assistantName?.toLowerCase(), "")
// //       .replace(/play|search|open|on youtube|youtube/gi, "")
// //       .trim();

// //     const url = query
// //       ? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
// //       : "https://www.youtube.com";
// //     window.open(url, "_blank");
// //     return true;
// //   }

// //   if (lower.includes("search") || lower.includes("google")) {
// //     const query = lower
// //       .replace(userData?.user?.assistantName?.toLowerCase(), "")
// //       .replace(/search|on google|google|for/gi, "")
// //       .trim();

// //     if (query) {
// //       window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
// //       return true;
// //     }
// //   }

// //   return false;
// // };

//   const handleCommandFromTranscript = (transcript) => {
//   const lower = transcript.toLowerCase().trim();

//   console.log("🔍 handleCommandFromTranscript called with:", lower); // ← ADD THIS

//   if (lower.includes("instagram")) {
//     console.log("✅ Opening Instagram");
//     window.open("https://www.instagram.com", "_blank");
//     return true;
//   }
//   // ... rest of your conditions
// };

//   const handleCommand = (data) => {
//       const { type, userInput, response } = data;
//       console.log("handleCommand called:", data);

//       if (type === "google_search") {
//         const query = encodeURIComponent(userInput);
//         window.open(`https://www.google.com/search?q=${query}`, "_blank");
//       }
//       if (type === "youtube_search" ) {
//         const query = encodeURIComponent(userInput);
//         window.open(
//           `https://www.youtube.com/results?search_query=${query}`,
//           "_blank",
//         );
//       }

//       if (type === "youtube_play") {
//     const query = encodeURIComponent(userInput);
//     window.open(
//       `https://www.youtube.com/results?search_query=${query}&autoplay=1`,
//       "_blank"
//     );
//   }

//       if (type === "instagram_open") {
//         const query = encodeURIComponent(userInput);
//         window.open(`https://www.instagram.com/`, "_blank");
//       }
//       if (type === "facebook_open") {
//         window.open(`https://www.facebook.com/`, "_blank");
//       }
//       if (type === "calculator_open") {
//         window.open(`https://www.google.com/search?q=calculation`, "_blank");
//       }
//       if (type === "weather_show") {
//         const query = encodeURIComponent(userInput);
//         window.open(`https://www.google.com/search?q=weather`, "_blank");
//       }
//     };

  
  

//   const safeStartRef = useRef(null);
//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "hi-IN";

//     // Voices may not be loaded yet — use onvoiceschanged or retry
//     const voices = window.speechSynthesis.getVoices();
//     const hindiVoice = voices.find((v) => v.lang === "hi-IN");
//     if (hindiVoice) utterance.voice = hindiVoice;

//     isSpeakingRef.current = true;

//     utterance.onend = () => {
//       isSpeakingRef.current = false;
//       setAiText("");
//       // ✅ Don't restart here — let recognition.onend handle it
//       // ✅ Just wait a moment then start safely
//       setTimeout(() => {
//         safeStartRef.current?.();
//       }, 800);
//     };

//     // ✅ Stop recognition BEFORE speaking to avoid aborted conflict
//     try {
//       recognitionRef.current?.stop();
//     } catch (e) {}

//     setTimeout(() => {
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     }, 300); // ✅ Small delay to let recognition fully stop
//   };

//   const speechRecognize = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.log("Speech Recognition not supported");
//       return;
//     }

//     // ✅ Always create a fresh instance
//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.continuous = true;
//     recognition.lang = "en-US";
//     recognition.interimResults = false;

//     let isMounted = true;
//     let restartTimer = null;

//     const safeStart = () => {
//       if (!isMounted) return;
//       if (isSpeakingRef.current) return; // ✅ Block if AI is speaking
//       if (isRecognizingRef.current) return; // ✅ Block if already running

//       clearTimeout(restartTimer);
//       restartTimer = setTimeout(() => {
//         if (!isMounted || isSpeakingRef.current || isRecognizingRef.current)
//           return;
//         try {
//           recognition.start();
//         } catch (err) {
//           console.log("Start error:", err.message);
//         }
//       }, 100); // ✅ Small debounce prevents rapid-fire starts
//     };

//     // ✅ Expose safeStart so speak() can call it
//     safeStartRef.current = safeStart;

//     recognition.onstart = () => {
//       if (!isMounted) return;
//       console.log("✅ Recognition STARTED");
//       setListening(true);
//       isRecognizingRef.current = true;
//     };

//     recognition.onend = () => {
//       if (!isMounted) return;
//       console.log("🔴 Recognition ENDED, isSpeaking:", isSpeakingRef.current);

//       setListening(false);
//       isRecognizingRef.current = false;

//       // ✅ Only restart if AI is NOT speaking
//       if (!isSpeakingRef.current) {
//         safeStart();
//       }
//     };

//     recognition.onerror = (event) => {
//       if (!isMounted) return;

//       console.log("❌ Error type:", event.error);
//       console.log("❌ Error message:", event.message);

//       // ✅ aborted/no-speech are non-fatal — just restart
//       if (event.error === "aborted" || event.error === "no-speech") {
//         isRecognizingRef.current = false;
//         if (!isSpeakingRef.current) safeStart();
//         return;
//       }

//       if (event.error === "not-allowed") {
//         console.log("Mic permission denied");
//         return;
//       }

//       isRecognizingRef.current = false;
//       safeStart();
//     };



//     recognition.onresult = async (event) => {
//   const transcript =
//     event.results[event.results.length - 1][0].transcript.trim();
//   const lower = transcript.toLowerCase();

//   setUserText(transcript);

//   if (!lower.includes(userData?.user?.assistantName?.toLowerCase())) return;

//   isSpeakingRef.current = true;
//   try { recognition.stop(); } catch (e) {}
//   isRecognizingRef.current = false;
//   setListening(false);

//   // ✅ Step 1: Open tab INSTANTLY — still inside gesture, zero async
//   handleCommandFromTranscript(transcript);

//   // ✅ Step 2: Call Gemini ONLY for spoken response
//   const data = await getGeminiResponse(transcript);

//   if (!data) {
//     isSpeakingRef.current = false;
//     safeStartRef.current?.();
//     return;
//   }

//   setAiText(data.response);
//   setUserText("");
//   speak(data.response);
//   // ✅ No handleCommand(data) needed anymore — tab already opened above
// };
//     safeStart();

//     return () => {
//       isMounted = false;
//       clearTimeout(restartTimer);
//       safeStartRef.current = null;

//       try {
//         recognition.abort();
//       } catch (e) {}

//       setListening(false);
//       isRecognizingRef.current = false;
//     };
//   };

// //   recognition.onresult = async (event) => {
// //   const transcript =
// //     event.results[event.results.length - 1][0].transcript.trim();
// //   const lower = transcript.toLowerCase().trim();

// //   setUserText(transcript);

// //   // ✅ Normalize assistant name safely
// //   const assistantName = (userData?.user?.assistantName || "").toLowerCase().trim();

// //   if (!assistantName || !lower.includes(assistantName)) return;

// //   // ✅ Open tab FIRST — still synchronous, still in gesture context
// //   const commandHandled = handleCommandFromTranscript(transcript);

// //   // ✅ THEN stop recognition and set state
// //   isSpeakingRef.current = true;
// //   try { recognition.stop(); } catch (e) {}
// //   isRecognizingRef.current = false;
// //   setListening(false);

// //   // ✅ Then do async work
// //   const data = await getGeminiResponse(transcript);

// //   if (!data) {
// //     isSpeakingRef.current = false;
// //     safeStartRef.current?.();
// //     return;
// //   }

// //   setAiText(data.response);
// //   setUserText("");
// //   speak(data.response);
// // };
// };
//   useEffect(() => {
//     if (!userData) return;

//     const cleanup = speechRecognize(); // ✅ Always initialize fresh

//     const handleResize = () => {
//       setIsSidebarOpen(window.innerWidth >= 768);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       cleanup?.();
//     };
//   }, [userData]); // ✅ Removed recognitionRef.current check — handled inside
//   return (
//     <div className="min-h-screen w-full flex bg-gradient-to-t from-black to-[#020270]">

//       <div
//         className={`fixed top-0 right-0 h-full w-64 sm:w-72 md:w-80 bg-gradient-to-b from-[#141e30] to-[#243b55] text-white p-4 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition duration-300 z-50 shadow-2xl`}
//       >
//         <h2 className="text-xl font-bold mb-4">Menu</h2>

//         <button
//           className="w-full mb-2 bg-white text-black rounded-full py-2 cursor-pointer"
//           onClick={handleLogOut}
//         >
//           Logout
//         </button>

//         <button
//           className="w-full mb-4 bg-white text-black rounded-full py-2 cursor-pointer"
//           onClick={() => navigate("/customize")}
//         >
//           Customize
//         </button>

//         <h3 className="text-lg font-semibold mb-2">History</h3>

//         <div className="overflow-y-auto h-[calc(100vh-180px)] pr-2">
//           {!history || history.length === 0 ? (
//             <p className="text-sm opacity-70">No history available</p>
//           ) : (
//             history.map((item, index) => (
//               <div key={index} className="bg-white/10 p-3 rounded-lg mb-2">
//                 <p className="text-sm">🧑 {item.command}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <button
//         className="absolute top-4 right-4 z-50 bg-white/90 px-3 py-1 rounded-full cursor-pointer"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         ☰
//       </button>

//       <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 text-white">
//         <div className="w-full flex justify-center items-center mt-8 sm:mt-6">
//           <img
//             src={userData?.user?.assistantImage}
//             alt="Assistant"
//             className="w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 lg:w-64 lg:h-80 object-cover rounded-2xl shadow-xl"
//           />
//         </div>

//         <p className="text-xl mt-5 font-medium">
//           I am {userData?.user?.assistantName}
//         </p>

//         <div className="mt-5 flex justify-center">
//           {!aiText ? (
//             <img
//               src={img1}
//               alt="User"
//               className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain mix-blend-screen"
//             />
//           ) : (
//             <img
//               src={img2}
//               alt="Assistant"
//               className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain mix-blend-screen"
//             />
//           )}
//         </div>

//         <h1 className="mt-3 text-xl font-bold text-center max-w-xl">
//           {userText || aiText}
//         </h1>
//       </div>
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
  const isRecognizingRef = useRef(false);
  const isMountedRef = useRef(true); // ✅ moved outside speechRecognize
  const restartTimerRef = useRef(null); // ✅ moved outside

  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const history = userData?.user?.history || [];

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${serverurl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserData(null);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/signin");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const handleCommandFromTranscript = (transcript) => {
    const lower = transcript.toLowerCase().trim();
    if (lower.includes("instagram")) {
      window.open("https://www.instagram.com", "_blank");
      return true;
    }
  };

  const handleCommand = (data) => {
    const { type, userInput } = data;

    if (type === "google_search")
      window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, "_blank");
    if (type === "youtube_search")
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, "_blank");
    if (type === "youtube_play")
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}&autoplay=1`, "_blank");
    if (type === "instagram_open")
      window.open(`https://www.instagram.com/`, "_blank");
    if (type === "facebook_open")
      window.open(`https://www.facebook.com/`, "_blank");
    if (type === "calculator_open")
      window.open(`https://www.google.com/search?q=calculation`, "_blank");
    if (type === "weather_show")
      window.open(`https://www.google.com/search?q=weather`, "_blank");
  };

  // ✅ safeStart defined at component level using refs
  const safeStart = () => {
    if (!isMountedRef.current) return;
    if (isSpeakingRef.current) return;
    if (isRecognizingRef.current) return;

    clearTimeout(restartTimerRef.current);
    restartTimerRef.current = setTimeout(() => {
      if (
        !isMountedRef.current ||
        isSpeakingRef.current ||
        isRecognizingRef.current
      ) return;

      try {
        recognitionRef.current?.start();
        console.log("✅ Recognition start called");
      } catch (err) {
        console.log("Start error:", err.message);
      }
    }, 300);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) utterance.voice = hindiVoice;

    isSpeakingRef.current = true;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setAiText("");
      setTimeout(() => safeStart(), 800);
    };

    try {
      recognitionRef.current?.stop();
    } catch (e) {}

    setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }, 300);
  };

  // ✅ Setup recognition ONCE, reuse the same instance
  const setupRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported");
      return;
    }

    // ✅ Only create if not already created
    if (recognitionRef.current) {
      console.log("Recognition already set up");
      safeStart();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition; // ✅ store in ref immediately

    recognition.continuous = false; // ✅ false is more stable across browsers
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      if (!isMountedRef.current) return;
      console.log("✅ Recognition STARTED");
      setListening(true);
      isRecognizingRef.current = true;
    };

    recognition.onend = () => {
      if (!isMountedRef.current) return;
      console.log("🔴 Recognition ENDED");
      setListening(false);
      isRecognizingRef.current = false;

      if (!isSpeakingRef.current) {
        safeStart(); // ✅ auto restart
      }
    };

    recognition.onerror = (event) => {
      if (!isMountedRef.current) return;
      console.log("❌ Error:", event.error);

      isRecognizingRef.current = false;

      if (event.error === "not-allowed") {
        console.log("Mic permission denied — cannot restart");
        return;
      }

      if (!isSpeakingRef.current) {
        safeStart();
      }
    };

    recognition.onresult = async (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      const lower = transcript.toLowerCase();

      console.log("🎤 Heard:", transcript);
      setUserText(transcript);

      // ✅ Check assistant name
      if (!lower.includes(userData?.user?.assistantName?.toLowerCase())) {
        return;
      }

      isSpeakingRef.current = true;
      isRecognizingRef.current = false;
      setListening(false);

      try {
        recognition.stop();
      } catch (e) {}

      handleCommandFromTranscript(transcript);

      const data = await getGeminiResponse(transcript);

      if (!data) {
        isSpeakingRef.current = false;
        safeStart();
        return;
      }

      setAiText(data.response);
      setUserText("");
      handleCommand(data);
      speak(data.response);
    };

    // ✅ Start for the first time
    safeStart();
  };

  useEffect(() => {
    if (!userData) return;

    isMountedRef.current = true;
    setupRecognition(); // ✅ called once

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // ✅ Proper cleanup
      isMountedRef.current = false;
      clearTimeout(restartTimerRef.current);
      window.removeEventListener("resize", handleResize);

      try {
        recognitionRef.current?.abort();
      } catch (e) {}

      recognitionRef.current = null; // ✅ clear ref so next mount recreates
      isRecognizingRef.current = false;
      isSpeakingRef.current = false;
      setListening(false);
    };
  }, [userData]);

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-t from-black to-[#020270]">
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 md:w-80 bg-gradient-to-b from-[#141e30] to-[#243b55] text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition duration-300 z-50 shadow-2xl`}
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
