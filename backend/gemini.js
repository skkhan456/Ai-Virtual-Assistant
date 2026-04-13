import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
const generateResponse = async (command, assistantName, userName) => {
  try {
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
    You are not Google. You will now behave like a voice-enabled assistant.

    Your task is to understand the user's natural language input and respond with a JSON object like this:

    {
    "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
            "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" |
            "instagram_open" | "facebook_open" | "weather_show",

    "userInput": "<original user input>" 
    (only remove your name from userinput if it exists, and if the user asks to search something on Google or YouTube, then only the search text should remain in userinput),

    "response": "<a short spoken response to read out loud to the user>"}

    Instructions:
    - "type": determine the intent of the user.
    - "userinput": original sentence the user spoke.
    - "response": a short, voice-friendly reply (like a real assistant).

    Type meanings:
    - "general": if it's a factual or informational question.
    - "google_search": if user wants to search something on Google.
    - "youtube_search": if user wants to search something on YouTube.
    - "youtube_play": if user wants to directly play a video or song.
    - "get_time": if user asks for current time.
    - "get_date": if user asks for today's date.
    - "get_day": if user asks for the day.
    - "get_month": if user asks for the month.
    - "calculator_open": if user wants to open a calculator.
    - "instagram_open": if user wants to open Instagram.
    - "facebook_open": if user wants to open Facebook.
    - "weather_show": if user wants to know weather.
    - "open_github": if user wants to open GitHub.
    - "open_linkedin": if user wants to open LinkedIn.
    - "open_whatsapp": if user wants to open WhatsApp.

    Important:
    - If user asks "who created you", respond using "${userName}" as author name.
    - Only respond with the JSON object, nothing else.
    Now your user input is: ${command}
    `;
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      },
    );

    const result = response.data.candidates[0].content.parts[0].text;
    console.log("Gemini response:"+result);
    return result;
  } catch (error) {
    console.error(
      "Error generating response:",
      error.response?.data || error.message,
    );

    throw error;
  }
};
export default generateResponse;

