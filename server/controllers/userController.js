import {
  generateToken,
  hashPassword,
  comparePassword,
} from "./../utils/auth.js";
import User from "./../models/profileModels/userModel/user.js";

//  Register User
const registerUser = async (req, res) => {
  console.log({
    userId,
    username: req.body.username,
    email: req.body.email,
  });
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a token for the user
    const token = generateToken(savedUser._id);

    // Send the token and user details in the response
    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    console.error("Registration failed", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error("Get all users failed:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get User By ID
const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId:", userId);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User:", user);
    res.json(user);
  } catch (error) {
    console.error("Get user by ID failed:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

//  Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    console.log("userId:", userId);
    console.log({
      userId,
      username: req.body.username,
      email: req.body.email,
    });

    const { name, username, email, password, socials, aboutMe, topFestivals } =
      req.body;

    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Username already exists",
        });
      }

      updateFields.username = username;
    }
    if (email !== undefined) updateFields.email = email;
    if (socials !== undefined) updateFields.socials = socials;
    if (aboutMe !== undefined) updateFields.aboutMe = aboutMe;
    if (topFestivals !== undefined) updateFields.topFestivals = topFestivals;

    if (password) {
      updateFields.password = await hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    console.log("Updated User:", user);

    res.status(200).json(user);
  } catch (error) {
    console.error("Update user failed:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Username or email already exists",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
};

const createUserProfile = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    // Hash the password
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ ...userData, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log("New User:", savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("CREATE USER PROFILE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Generate a token for the user
    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Deleted User:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    // Clear the token from the client-side local storage
    // No server-side logout logic is required since using JWT
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    res.status(500).json({ error: "Logout failed" });
  }
};

export {
  registerUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUserProfile,
  createUserProfile,
  deleteUser,
  logoutUser,
};
