import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      email,
      password,
    } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(200).json({
  message: "Login Successful",
  user: {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  },
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMe = async (
  req,
  res
) => {
  res.status(200).json(
    req.user
  );
};
export const logout = (
  req,
  res
) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logged out",
  });
};