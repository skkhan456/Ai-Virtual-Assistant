import generateToken from "../config/token.js";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("BODY:", req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ message:"All fields are required"});
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists"});
    }

    if (password.length <= 6) {
      return res.status(400).json({ message: "password must be greater than 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    console.log(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "signup error"});
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message: "email does not exist"});
    }

    const equal = await bcrypt.compare(password, user.password);
    if (!equal) {
      return res.status(400).json({message: "invalid password"});
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({message: "login error"});
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token"); // clear token from cookie for logout
    res.status(201).json({message: "logged out successfully"});
  } catch (error) {
    res.status(500).json({message: "logout error"});
    console.log(error);
  }
};
