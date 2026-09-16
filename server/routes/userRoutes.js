const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDB } = require("../db");

const router = express.Router();

// POST - Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const db = getDB();

    const existingUser = await db
      .collection("users")
      .findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    };

    const result = await db
      .collection("users")
      .insertOne(user);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});

// POST - Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const db = getDB();

    const user = await db
      .collection("users")
      .findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
    {
        id: user._id.toString(),
        email: user.email,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d",
    }
    );

    res.json({
    message: "Login successful",
    token: token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
    },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

module.exports = router;