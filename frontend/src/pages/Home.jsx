


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
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth >= 768
  );

  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const restartTimeoutRef = useRef(null);

  const history = userData?.user?.history || [];

  // ================= LOGOUT =================

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
      console.log("Logout error:", error);
    }
  };

  // ================= COMMAND HANDLER =================

  const handleCommandFromTranscript = (transcript) => {
    const lower = transcript.toLowerCase();

    // Instagram
    if (lower.includes("instagram")) {
      window.open("https://www.instagram.com", "_blank");
      return true;
    }

    // Facebook
    if (lower.includes("facebook")) {
      window.open("https://www.facebook.com", "_blank");
      return true;
    }

    // WhatsApp
    if (lower.includes("whatsapp")) {
      window.open("https://web.whatsapp.com", "_blank");
      return true;
    }

    // GitHub
    if (lower.includes("github")) {
      window.open("https://github.com", "_blank");
      return true;
    }

    // LinkedIn
    if (lower.includes("linkedin")) {
      window.open("https://linkedin.com", "_blank");
      return true;
    }

    // Weather
    if (lower.includes("weather")) {
      window.open(
        "https://www.google.com/search?q=weather",
        "_blank"
      );
      return true;
    }

    // Calculator
    if (lower.includes("calculator")) {
      window.open(
        "https://www.google.com/search?q=calculator",
        "_blank"
      );
      return true;
    }

    // YouTube
    if (lower.includes("youtube")) {
      const query = lower
        .replace("youtube", "")
        .replace("play", "")
        .replace("search", "")
        .trim();

      const url = query
        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
        : "https://www.youtube.com";

      window.open(url, "_blank");

      return true;
    }

    // Google Search
    if (lower.includes("search")) {
      const query = lower
        .replace("search", "")
        .replace("google", "")
        .trim();

      if (query) {
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          "_blank"
        );

        return true;
      }
    }

    return false;
  };

  // ================= SAFE START =================

  const safeStartRecognition = () => {
    if (!recognitionRef.current) return;

    if (isRecognizingRef.current) return;

    if (isSpeakingRef.current) return;

    clearTimeout(restartTimeoutRef.current);

    restartTimeoutRef.current = setTimeout(() => {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.log("Recognition start error:", error.message);
      }
    }, 500);
  };

  // ================= SPEAK FUNCTION =================

  const speak = (text) => {
    if (!text) return;

    const synth = window.speechSynthesis;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";

    isSpeakingRef.current = true;

    utterance.onstart = () => {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setAiText("");

      safeStartRecognition();
    };

    synth.speak(utterance);
  };

  // ================= SETUP SPEECH RECOGNITION =================

  useEffect(() => {
    if (!userData) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    // ---------- START ----------

    recognition.onstart = () => {
      console.log("Recognition started");

      isRecognizingRef.current = true;

      setListening(true);
    };

    // ---------- END ----------

    recognition.onend = () => {
      console.log("Recognition ended");

      isRecognizingRef.current = false;

      setListening(false);

      if (!isSpeakingRef.current) {
        safeStartRecognition();
      }
    };

    // ---------- ERROR ----------

    recognition.onerror = (event) => {
      console.log("Recognition error:", event.error);

      isRecognizingRef.current = false;

      setListening(false);

      if (event.error === "not-allowed") {
        alert("Microphone permission denied");
        return;
      }

      if (!isSpeakingRef.current) {
        safeStartRecognition();
      }
    };

    // ---------- RESULT ----------

    recognition.onresult = async (event) => {
      try {
        const transcript =
          event.results[event.results.length - 1][0].transcript.trim();

        console.log("User said:", transcript);

        if (!transcript) return;

        setUserText(transcript);

        const assistantName =
          userData?.user?.assistantName?.toLowerCase() || "";

        const lower = transcript.toLowerCase();

        // Assistant wake word check
        if (!lower.includes(assistantName)) {
          return;
        }

        // Stop recognition
        try {
          recognition.stop();
        } catch (e) {}

        isRecognizingRef.current = false;

        setListening(false);

        // Open direct commands instantly
        handleCommandFromTranscript(transcript);

        // ================= GEMINI API =================

        console.log("Sending to Gemini:", transcript);

        const data = await getGeminiResponse(transcript);

        console.log("Gemini response:", data);

        if (!data || !data.response) {
          safeStartRecognition();
          return;
        }

        setAiText(data.response);

        setUserText("");

        speak(data.response);

      } catch (error) {
        console.log("Gemini error:", error);

        safeStartRecognition();
      }
    };

    // Initial start
    safeStartRecognition();

    // Resize listener
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      clearTimeout(restartTimeoutRef.current);

      try {
        recognition.abort();
      } catch (e) {}

      recognitionRef.current = null;

      isRecognizingRef.current = false;
      isSpeakingRef.current = false;
    };
  }, [userData]);

  // ================= UI =================

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-t from-black to-[#020270]">

      {/* ================= SIDEBAR ================= */}

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
          {history.length === 0 ? (
            <p className="text-sm opacity-70">
              No history available
            </p>
          ) : (
            history.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 p-3 rounded-lg mb-2"
              >
                <p className="text-sm">
                  🧑 {item.command}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= SIDEBAR BUTTON ================= */}

      <button
        className="absolute top-4 right-4 z-50 bg-white/90 px-3 py-1 rounded-full cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* ================= MAIN ================= */}

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
              alt="AI"
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 object-contain mix-blend-screen"
            />
          )}
        </div>

        <h1 className="mt-3 text-xl font-bold text-center max-w-xl">
          {userText || aiText}
        </h1>

        <p className="mt-4 text-sm opacity-70">
          {listening ? "🎤 Listening..." : "💤 Waiting..."}
        </p>

      </div>
    </div>
  );
};

export default Home;

