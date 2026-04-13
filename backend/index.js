import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRouter from "./router/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./router/user.router.js";
import generateResponse from "./gemini.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "https://virtualassistant-frontend-irgs.onrender.com", // your frontend
  credentials: true               // ✅ IMPORTANT
}));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
connectdb();

app.get("/", async (req, res) => {
  const prompt = req.query.prompt;
  console.log("Incoming prompt:", prompt);
  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  const response = await generateResponse(prompt);

  res.json({ result: response });
});

app.listen(port, () => {
  console.log("server started");
});
