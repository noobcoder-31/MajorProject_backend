import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getToken from "../utils/getToken.js";

// user register
export const register = async (req, res, next) => {
  try {
    const { username, email, password, gender, fullname, location } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const isthere = await User.findOne({ email });
    if (isthere) {
      throw new Error("Email already in use");
    }
    const isthere2 = await User.findOne({ username });
    if (isthere2) {
      throw new Error("Username already Exists");
    }

    const boypic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlpic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      username,
      fullname,
      email,
      password: hashPassword,
      gender,
      photo: gender === "male" ? boypic : girlpic,
      location,
    });
    const token = getToken(newUser._id);
    const userWithoutPassword = { ...newUser.toObject() };

    delete userWithoutPassword.password;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        success: true,
        message: "Successfully created!",
        data: userWithoutPassword,
      });
  } catch (err) {
    next(err);
  }
};

// user login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("blog");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const checkCorrectPassword = await bcrypt.compare(password, user.password);

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ susccess: false, message: "Incorrect email or password!" });
    }

    const token = getToken(user._id);

    const userWithoutPassword = { ...user.toObject() };

    delete userWithoutPassword.password;

    // set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({ token, data: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};
